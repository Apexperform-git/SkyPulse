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
        // Attempt 1: AirLabs Schedules API (best for commercial scheduled flights)
        const schedulesRes = await fetch(
            `${AIRLABS_SCHEDULES_URL}?flight_icao=${encodeURIComponent(callsign)}&api_key=${AIRLABS_API_KEY}`,
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

        // Attempt 2: Aviationstack (Fallback for rate limits)
        if (AVIATIONSTACK_API_KEY) {
            const asRes = await fetch(
                `${AVIATIONSTACK_URL}?access_key=${AVIATIONSTACK_API_KEY}&flight_icao=${encodeURIComponent(callsign)}`,
                { cache: "no-store" }
            );
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

        // Attempt 3: AirLabs Flight Tracker (Fallback for non-scheduled live flights like military/private)
        const flightRes = await fetch(
            `${AIRLABS_FLIGHT_URL}?flight_icao=${encodeURIComponent(callsign)}&api_key=${AIRLABS_API_KEY}`,
            { cache: "no-store" }
        );

        if (flightRes.ok) {
            const data = await flightRes.json();
            if (data.response && data.response.dep_iata) {
                return NextResponse.json({
                    dep_iata: data.response.dep_iata || null,
                    arr_iata: data.response.arr_iata || null,
                    dep_time: null, // Live tracker endpoints usually lack schedule times
                    arr_time: null,
                });
            }
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
