"use client";

import { useEffect, useRef } from "react";
import { Capacitor } from "@capacitor/core";
import { AdMob, BannerAdOptions, BannerAdSize, BannerAdPosition } from "@capacitor-community/admob";

export function AdMobProvider({ children }: { children: React.ReactNode }) {
    const initialized = useRef(false);

    useEffect(() => {
        async function initAdMob() {
            if (Capacitor.isNativePlatform() && !initialized.current) {
                try {
                    await AdMob.initialize();
                    initialized.current = true;

                    const options: BannerAdOptions = {
                        adId: "ca-app-pub-2675217460226988/5408867908",
                        adSize: BannerAdSize.BANNER,
                        position: BannerAdPosition.TOP_CENTER,
                        margin: 0,
                        isTesting: true,
                    };

                    await AdMob.showBanner(options);
                } catch (error) {
                    console.error("Failed to initialize or show AdMob banner:", error);
                }
            }
        }

        initAdMob();

        return () => {
            // Clean up banner on unmount if initialized
            if (Capacitor.isNativePlatform() && initialized.current) {
                AdMob.hideBanner().catch(console.error);
                AdMob.removeBanner().catch(console.error);
            }
        };
    }, []);

    return <>{children}</>;
}
