import { NextResponse } from "next/server";

export const runtime = "edge";

const AVIATIONSTACK_API_KEY = process.env.AVIATIONSTACK_API_KEY || "b13cb1ed25f9e1eda58fc1b617ff3c98";
const AVIATIONSTACK_URL = "http://api.aviationstack.com/v1/flights";

export async function GET(request: Request) {
    if (!AVIATIONSTACK_API_KEY) {
        return NextResponse.json(
            { error: "AVIATIONSTACK_API_KEY is not configured on the server." },
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
        const res = await fetch(
            `${AVIATIONSTACK_URL}?access_key=${AVIATIONSTACK_API_KEY}&flight_icao=${encodeURIComponent(callsign)}`,
            { cache: "no-store" } // Aviationstack requires standard http for free tier mostly.
        );

        if (!res.ok) {
            return NextResponse.json(
                { error: "Failed to fetch route from Aviationstack" },
                { status: res.status }
            );
        }

        const data = await res.json();

        if (data.error) {
            return NextResponse.json(
                { error: data.error.message || "Aviationstack returned an error" },
                { status: 400 }
            );
        }

        // Aviationstack returns an array under `data`
        const flight = data.data?.[0];

        return NextResponse.json({
            dep_iata: flight?.departure?.iata || null,
            arr_iata: flight?.arrival?.iata || null,
        });
    } catch (error) {
        console.error("Error looking up flight route from Aviationstack:", error);
        return NextResponse.json(
            { error: "Internal Server Error during flight route lookup" },
            { status: 500 }
        );
    }
}
