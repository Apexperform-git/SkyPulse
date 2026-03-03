/**
 * Exact Routes lookup using our backend AirLabs API proxy.
 */

import { AIRPORTS, type Airport } from "./airports";
import { Capacitor } from "@capacitor/core";

function getApiUrl(path: string) {
  if (Capacitor.isNativePlatform()) {
    return `https://skypulse.live${path}`;
  }
  return path;
}

export type Route = {
  airlineIcao: string;
  flightNumber: string;
  origin: Airport | null;
  destination: Airport | null;
  equipment: string | null;
  departureTime: string | null;
  arrivalTime: string | null;
};

// Airport lookup by IATA code for O(1) matching
const airportByIata = new Map<string, Airport>();
for (const airport of AIRPORTS) {
  airportByIata.set(airport.iata, airport);
}

// Memory cache for flight outcomes so we don't bombard the API
// Key: normalized callsign, Value: Route or null if no route found
const routeCache = new Map<string, Route | null>();

/**
 * Look up exact route by callsign (e.g., "KLM123A" -> AMS -> JFK) via API.
 * Returns origin and destination airports if found.
 */
export async function lookupRoute(callsign: string | null): Promise<Route | null> {
  if (!callsign) return null;

  const normalized = callsign.trim().toUpperCase();

  if (routeCache.has(normalized)) {
    return routeCache.get(normalized) || null;
  }

  // Extract airline ICAO (first 3 chars usually)
  const airlineIcao = normalized.length >= 3 ? normalized.substring(0, 3) : normalized;

  try {
    const res = await fetch(getApiUrl(`/api/flight/route?callsign=${encodeURIComponent(normalized)}`));

    if (!res.ok) {
      // Don't cache hard 500s or 401s if API key is invalid so it can retry later
      return null;
    }

    const data = await res.json();

    // If no exact match found, cache `null` to prevent infinite refetching
    if (!data.dep_iata || !data.arr_iata) {
      routeCache.set(normalized, null);
      return null;
    }

    const origin = airportByIata.get(data.dep_iata) || null;
    const destination = airportByIata.get(data.arr_iata) || null;

    const route: Route = {
      airlineIcao,
      flightNumber: normalized,
      origin,
      destination,
      equipment: null,
      departureTime: data.dep_time || null,
      arrivalTime: data.arr_time || null,
    };

    routeCache.set(normalized, route);
    return route;

  } catch (error) {
    console.error(`Failed to lookup route for ${normalized}:`, error);
    return null;
  }
}

/**
 * Synchronous lookup for preloaded routes (client-side after initial async load)
 * Returns `undefined` if the route hasn't been fetched yet.
 */
export function lookupRouteSync(callsign: string | null): Route | null | undefined {
  if (!callsign) return null;
  const normalized = callsign.trim().toUpperCase();
  if (routeCache.has(normalized)) {
    return routeCache.get(normalized);
  }
  return undefined; // Not in cache (loading)
}
