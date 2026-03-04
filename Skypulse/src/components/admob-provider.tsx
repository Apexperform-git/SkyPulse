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

                    // Listen for actual banner height and convert native px → CSS px
                    await AdMob.addListener(BannerAdPluginEvents.SizeChanged, (size: AdMobBannerSize) => {
                        const dpr = window.devicePixelRatio || 1;
                        const heightCssPx = Math.ceil(size.height / dpr);
                        document.documentElement.style.setProperty("--ad-banner-height", `${heightCssPx}px`);
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
