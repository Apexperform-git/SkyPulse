"use client";

import { useEffect, useRef } from "react";
import { Capacitor } from "@capacitor/core";
import { AdMob, BannerAdOptions, BannerAdSize, BannerAdPosition, BannerAdPluginEvents, AdMobBannerSize } from "@capacitor-community/admob";

// Helper to convert native Android px → CSS px
function nativeToCss(nativePx: number): number {
    return Math.ceil(nativePx / (window.devicePixelRatio || 1));
}

function setAdHeight(px: number) {
    document.documentElement.style.setProperty("--ad-banner-height", `${px}px`);
}

export function AdMobProvider({ children }: { children: React.ReactNode }) {
    const initialized = useRef(false);
    const heightRef = useRef(56);

    useEffect(() => {
        if (!Capacitor.isNativePlatform()) return;

        // On mount, apply the last known height immediately (56 default)
        setAdHeight(heightRef.current);

        async function initAdMob() {
            if (initialized.current) {
                // Already initialized (e.g. Strict Mode second pass), just re-show
                AdMob.showBanner({
                    adId: "ca-app-pub-2675217460226988/5408867908",
                    adSize: BannerAdSize.ADAPTIVE_BANNER,
                    position: BannerAdPosition.TOP_CENTER,
                    margin: 0,
                    isTesting: true,
                }).catch(console.error);
                return;
            }

            try {
                await AdMob.initialize();
                initialized.current = true;

                await AdMob.addListener(BannerAdPluginEvents.SizeChanged, (size: AdMobBannerSize) => {
                    const h = nativeToCss(size.height);
                    heightRef.current = h;
                    setAdHeight(h);
                });

                await AdMob.showBanner({
                    adId: "ca-app-pub-2675217460226988/5408867908",
                    adSize: BannerAdSize.ADAPTIVE_BANNER,
                    position: BannerAdPosition.TOP_CENTER,
                    margin: 0,
                    isTesting: true,
                });
            } catch (error) {
                console.error("AdMob init failed:", error);
                setAdHeight(0);
            }
        }

        initAdMob();

        return () => {
            // Unmount: hide banner and reset CSS space so the UI pops back up
            AdMob.hideBanner().catch(console.error);
            setAdHeight(0);
        };
    }, []);

    return <>{children}</>;
}
