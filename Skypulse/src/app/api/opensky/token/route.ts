import { NextResponse } from "next/server";

export const runtime = "edge";

const OPENSKY_TOKEN_URL =
    "https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token";

const OPENSKY_CLIENT_ID = process.env.OPENSKY_CLIENT_ID || "";
const OPENSKY_CLIENT_SECRET = process.env.OPENSKY_CLIENT_SECRET || "";

export async function GET() {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4500);

        const res = await fetch(OPENSKY_TOKEN_URL, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `grant_type=client_credentials&client_id=${OPENSKY_CLIENT_ID}&client_secret=${OPENSKY_CLIENT_SECRET}`,
            cache: "no-store",
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!res.ok) {
            console.error("Backend: Failed to get OpenSky token:", res.status);
            return NextResponse.json(
                { error: "Failed to fetch OpenSky token" },
                { status: res.status }
            );
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (e: any) {
        if (e.name === 'AbortError') {
            console.error("Backend: OpenSky token fetch timed out (Firewall block?)");
            return NextResponse.json(
                { error: "OpenSky Auth Server Timeout: Connection may be firewalled" },
                { status: 504 }
            );
        }

        console.error("Backend: Error getting OpenSky token:", e);
        return NextResponse.json(
            { error: "Internal Server Error fetching OpenSky token" },
            { status: 500 }
        );
    }
}
