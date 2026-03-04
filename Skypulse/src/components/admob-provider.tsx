"use client";

import { useEffect, useRef } from "react";
import { Capacitor } from "@capacitor/core";
import { AdMob, BannerAdOptions, BannerAdSize, BannerAdPosition, BannerAdPluginEvents, AdMobBannerSize } from "@capacitor-community/admob";

export function AdMobProvider({ children }: { children: React.ReactNode }) {
    const initialized = useRef(false);
    const listenerHandle = useRef<any>(null);

    useEffect(() => {
        async function initAdMob() {
            if (Capacitor.isNativePlatform() && !initialized.current) {
                try {
                    await AdMob.initialize();
                    initialized.current = true;

                    // Listen for the actual banner height so we can push the app content down
                    await AdMob.addListener(BannerAdPluginEvents.SizeChanged, (size: AdMobBannerSize) => {
                        // Read the status-bar height that CSS exposes via env(safe-area-inset-top)
                        const satStr = getComputedStyle(document.documentElement).getPropertyValue("--sat").trim();
                        const sat = parseFloat(satStr) || 0;
                        document.documentElement.style.setProperty("--ad-banner-height", `${size.height + sat}px`);
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
                    console.error("Failed to initialize or show AdMob banner:", error);
                }
            }
        }

        initAdMob();

        return () => {
            if (Capacitor.isNativePlatform() && initialized.current) {
                AdMob.hideBanner().catch(console.error);
                AdMob.removeBanner().catch(console.error);
                document.documentElement.style.setProperty("--ad-banner-height", "0px");
            }
        };
    }, []);

    return <>{children}</>;
}
