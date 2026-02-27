"use client";

import { motion } from "motion/react";
import { useSettings } from "@/hooks/use-settings";

const FT_LABELS = [
  "43,000 ft",
  "20,000 ft",
  "10,000 ft",
  "5,000 ft",
  "2,000 ft",
  "500 ft",
  "0 ft",
];

const M_LABELS = [
  "13,000 m",
  "6,000 m",
  "3,000 m",
  "1,500 m",
  "600 m",
  "150 m",
  "0 m",
];

export function AltitudeLegend() {
  const { settings } = useSettings();
  const labels = settings.altitudeUnit === "meters" ? M_LABELS : FT_LABELS;

  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.6 }}
      className="flex flex-col gap-2 rounded-xl border p-3 backdrop-blur-2xl"
      style={{
        borderColor: "rgb(var(--ui-fg) / 0.06)",
        backgroundColor: "rgb(var(--ui-bg) / 0.5)",
      }}
      role="img"
      aria-label={`Altitude color scale from 0 to 43,000 ${settings.altitudeUnit === "meters" ? "meters" : "feet"}`}
    >
      <p
        className="text-[10px] font-semibold tracking-widest uppercase"
        style={{ color: "rgb(var(--ui-fg) / 0.3)" }}
      >
        Altitude
      </p>
      <div className="flex items-center gap-2">
        <div
          className="h-32 w-1.5 rounded-full"
          style={{
            background:
              "linear-gradient(to top, rgb(72,210,160), rgb(160,195,80), rgb(235,150,60), rgb(240,110,80), rgb(220,85,130), rgb(180,90,190), rgb(120,110,220), rgb(100,170,240))",
          }}
        />
        <div className="flex h-32 flex-col justify-between">
          {labels.map((label) => (
            <span
              key={label}
              className="text-[10px] font-medium"
              style={{ color: "rgb(var(--ui-fg) / 0.5)" }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
