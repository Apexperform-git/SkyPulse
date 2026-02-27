import { NextResponse } from "next/server";

export const runtime = "edge";

const AIRLABS_API_KEY = process.env.AIRLABS_API_KEY || "";
const AVIATIONSTACK_API_KEY = process.env.AVIATIONSTACK_API_KEY || "";

const AIRLABS_SCHEDULES_URL = "https://airlabs.co/api/v9/schedules";
const AIRLABS_FLIGHT_URL = "https://airlabs.co/api/v9/flight";
const AVIATIONSTACK_URL = "http://api.aviationstack.com/v1/flights";

export async function GET(request: Request) {
    if (!AIRLABS_API_KEY) {
        return NextResponse.json(
            { error: "AIRLABS_API_KEY is not configured on the server." },
            { status: 500 }
        );
    }

    const { searchParams } = new URL(request.url);
    const callsign = searchParams.get("callsign");

    if (!callsign) {
        return NextResponse.json(
            { error: "Missing callsign parameter" },
            { status: 400 }
        );
    }

    try {
        let commercialFlightId = callsign; // Default to the callsign
        let fallbackDepIata: string | null = null;
        let fallbackArrIata: string | null = null;

        // Step 1: Query Live Tracker API to resolve the ATC callsign into a commercial flight number
        try {
            const flightRes = await fetch(
                `${AIRLABS_FLIGHT_URL}?flight_icao=${encodeURIComponent(callsign)}&api_key=${AIRLABS_API_KEY}`,
                { cache: "no-store" }
            );

            if (flightRes.ok) {
                const data = await flightRes.json();
                if (data.error) {
                    throw new Error(data.error.message || "Flight not tracked by AirLabs");
                }
                if (data.response && (data.response.flight_iata || data.response.flight_icao)) {
                    commercialFlightId = data.response.flight_iata || data.response.flight_icao;
                    // Save generic live origin/dest just in case schedules fail
                    fallbackDepIata = data.response.dep_iata || null;
                    fallbackArrIata = data.response.arr_iata || null;
                }
            }
        } catch (err) {
            console.warn("AirLabs Live Tracker failed to translate callsign, falling back to raw callsign:", err);
        }

        // Step 2: Query AirLabs Schedules API using the commercial flight number
        const schedulesRes = await fetch(
            `${AIRLABS_SCHEDULES_URL}?flight_iata=${encodeURIComponent(commercialFlightId)}&api_key=${AIRLABS_API_KEY}`,
            { cache: "no-store" }
        );

        if (schedulesRes.ok) {
            const data = await schedulesRes.json();
            if (data.response && data.response.length > 0) {
                const schedule = data.response[0];
                return NextResponse.json({
                    dep_iata: schedule.dep_iata || null,
                    arr_iata: schedule.arr_iata || null,
                    dep_time: schedule.dep_estimated || schedule.dep_time || null,
                    arr_time: schedule.arr_estimated || schedule.arr_time || null,
                });
            } else if (schedulesRes.status === 429) {
                console.warn("AirLabs hit rate limit. Falling back to Aviationstack...");
            }
        }

        // Step 3: Aviationstack (Fallback 1)
        if (AVIATIONSTACK_API_KEY) {
            let asUrl = `${AVIATIONSTACK_URL}?access_key=${AVIATIONSTACK_API_KEY}&flight_iata=${encodeURIComponent(commercialFlightId)}`;

            // If we still have an ATC callsign (e.g. TRA26Q) and never got a commercial ID
            if (commercialFlightId === callsign && callsign.length > 3) {
                // Extract 3-letter ICAO airline code and numeric flight number
                const airlineMatch = callsign.match(/^[A-Z]{3}/);
                const numberMatch = callsign.match(/\d+/);

                if (airlineMatch && numberMatch) {
                    asUrl = `${AVIATIONSTACK_URL}?access_key=${AVIATIONSTACK_API_KEY}&airline_icao=${encodeURIComponent(airlineMatch[0])}&flight_num=${encodeURIComponent(numberMatch[0])}`;
                }
            }

            const asRes = await fetch(asUrl, { cache: "no-store" });

            if (asRes.ok) {
                const asData = await asRes.json();
                if (asData.data && asData.data.length > 0) {
                    const flight = asData.data[0];
                    return NextResponse.json({
                        dep_iata: flight.departure?.iata || null,
                        arr_iata: flight.arrival?.iata || null,
                        dep_time: flight.departure?.estimated || flight.departure?.scheduled || null,
                        arr_time: flight.arrival?.estimated || flight.arrival?.scheduled || null,
                    });
                }
            }
        }

        // Step 4: Live Tracker Fallback 
        // If neither schedule API found anything, return the generic origin/dest we found in Step 1
        if (fallbackDepIata || fallbackArrIata) {
            return NextResponse.json({
                dep_iata: fallbackDepIata,
                arr_iata: fallbackArrIata,
                dep_time: null,
                arr_time: null,
            });
        }

        // Output explicitly empty route if nothing found so the frontend handles it gracefully
        return NextResponse.json({
            dep_iata: null,
            arr_iata: null,
            dep_time: null,
            arr_time: null,
        });

    } catch (error) {
        console.error("Error looking up flight route:", error);
        return NextResponse.json(
            { error: "Internal Server Error during flight route lookup" },
            { status: 500 }
        );
    }
}
