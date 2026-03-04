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

    useEffect(() => {
        async function initAdMob() {
            if (!Capacitor.isNativePlatform() || initialized.current) return;
            try {
                await AdMob.initialize();
                initialized.current = true;

                // Pre-set a conservative estimate so the HUD is already shifted BEFORE
                // the banner appears. ADAPTIVE_BANNER on a phone ≈ 56 CSS dp.
                setAdHeight(56);

                // Register SizeChanged BEFORE showBanner to avoid race conditions
                await AdMob.addListener(BannerAdPluginEvents.SizeChanged, (size: AdMobBannerSize) => {
                    setAdHeight(nativeToCss(size.height));
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
                setAdHeight(0);
            }
        }

        initAdMob();

        return () => {
            if (Capacitor.isNativePlatform() && initialized.current) {
                AdMob.hideBanner().catch(console.error);
                AdMob.removeBanner().catch(console.error);
                setAdHeight(0);
            }
        };
    }, []);

    return <>{children}</>;
}
