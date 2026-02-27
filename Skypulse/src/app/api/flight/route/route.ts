import { NextResponse } from "next/server";

export const runtime = "edge";

const AIRLABS_API_KEY = process.env.AIRLABS_API_KEY || "07abefda-6a6b-4926-a908-4c1ca788010e";
const AIRLABS_FLIGHT_URL = "https://airlabs.co/api/v9/flight";

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
        // AirLabs flight_icao parameter accepts callsigns / flight numbers
        const res = await fetch(
            `${AIRLABS_FLIGHT_URL}?flight_icao=${encodeURIComponent(callsign)}&api_key=${AIRLABS_API_KEY}`,
            { cache: "no-store" }
        );

        if (!res.ok) {
            return NextResponse.json(
                { error: "Failed to fetch route from AirLabs" },
                { status: res.status }
            );
        }

        const data = await res.json();

        if (data.error) {
            return NextResponse.json(
                { error: data.error.message || "AirLabs returned an error" },
                { status: 400 }
            );
        }

        // Return just the relevant airport data
        return NextResponse.json({
            dep_iata: data.response?.dep_iata || null,
            arr_iata: data.response?.arr_iata || null,
        });
    } catch (error) {
        console.error("Error looking up flight route from AirLabs:", error);
        return NextResponse.json(
            { error: "Internal Server Error during flight route lookup" },
            { status: 500 }
        );
    }
}
