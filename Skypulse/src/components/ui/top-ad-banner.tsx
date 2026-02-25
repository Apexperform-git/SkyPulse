"use client";

import { useEffect, useState } from "react";

export function TopAdBanner() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        try {
            if (typeof window !== "undefined") {
                ((window as unknown as { adsbygoogle: unknown[] }).adsbygoogle =
                    (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle || []).push({});
            }
        } catch (e) {
            console.error("AdSense error:", e);
        }
    }, []);

    if (!mounted) return null;

    return (
        <div className="pointer-events-auto absolute left-0 right-0 top-0 z-50 flex w-full justify-center bg-black/80 backdrop-blur-md border-b border-white/10 p-2 sm:p-4">
            <div className="h-[90px] w-full max-w-[728px] overflow-hidden rounded-lg bg-neutral-900 flex items-center justify-center text-white/20 text-xs text-center border border-white/5">
                <ins
                    className="adsbygoogle"
                    style={{ display: "inline-block", width: "100%", height: "90px" }}
                    data-ad-client="ca-pub-2675217460226988"
                    data-ad-slot="8616904617"
                />
            </div>
        </div>
    );
}
