"use client";

import { useEffect, useRef } from "react";
import { Capacitor } from "@capacitor/core";
import { AdMob, BannerAdOptions, BannerAdSize, BannerAdPosition, BannerAdPluginEvents, AdMobBannerSize } from "@capacitor-community/admob";

function setAdHeight(px: number) {
    document.documentElement.style.setProperty("--ad-banner-height", `${px}px`);
}

export function AdMobProvider({ children }: { children: React.ReactNode }) {
    const initialized = useRef(false);

    useEffect(() => {
        if (!Capacitor.isNativePlatform() || initialized.current) return;

        async function initAdMob() {
            try {
                // Instantly push UI down 60px before we even ask AdMob to load
                setAdHeight(60);

                await AdMob.initialize();
                initialized.current = true;

                await AdMob.addListener(BannerAdPluginEvents.SizeChanged, (size: AdMobBannerSize) => {
                    // Ignore 0-height collapses (e.g., when an ad fails to refresh temporarily)
                    if (size.height > 0) {
                        setAdHeight(size.height);
                    }
                });

                const options: BannerAdOptions = {
                    adId: "ca-app-pub-2675217460226988/5408867908",
                    adSize: BannerAdSize.ADAPTIVE_BANNER,
                    position: BannerAdPosition.TOP_CENTER,
                    margin: 0,
                    isTesting: true,
                };

                await AdMob.showBanner(options);
            } catch (error) {
                console.error("AdMob init failed:", error);
                // Keep the 60px padding even if it fails, so we don't snap up and down
            }
        }

        initAdMob();

        // NO CLEANUP: We want the banner to persist permanently.
        // This prevents React 18 Strict Mode from hiding the banner and resetting the height to 0!
    }, []);

    return <>{children}</>;
}
