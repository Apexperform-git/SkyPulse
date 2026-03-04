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

                    listenerHandle.current = await AdMob.addListener(BannerAdPluginEvents.SizeChanged, (size: AdMobBannerSize) => {
                        // Use margin-top on the root HTML element instead of body padding for better fixed element pushdown
                        document.documentElement.style.marginTop = `${size.height}px`;
                        document.documentElement.style.height = `calc(100% - ${size.height}px)`;
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
            // Clean up banner on unmount if initialized
            if (Capacitor.isNativePlatform() && initialized.current) {
                if (listenerHandle.current) {
                    listenerHandle.current.remove().catch(console.error);
                }
                AdMob.hideBanner().catch(console.error);
                AdMob.removeBanner().catch(console.error);
                document.documentElement.style.marginTop = "0px";
                document.documentElement.style.height = "100%";
            }
        };
    }, []);

    return <>{children}</>;
}
