"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Capacitor } from "@capacitor/core";

export function NativeAppBypass() {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // If we're inside the Android app and sitting on the marketing landing page,
        // skip it and go straight to the Map.
        if (Capacitor.isNativePlatform() && pathname === "/") {
            router.replace("/map");
        }
    }, [pathname, router]);

    return null;
}
