 "use client";
import { useState, useEffect } from "react";
import { useSoundSystem, isMuted } from "@/lib/useSound";

export default function SoundButton() {
  const [muted, setMuted] = useState(false);
  const { play } = useSoundSystem();

  useEffect(() => {
    setMuted(isMuted());
  }, []);

  const toggle = () => {
    const next = !muted;
    setMuted(next);
    if (!next) {
      setTimeout(() => play("click"), 20);
    }
  };

  return (
    <button
      onClick={toggle}
      title={muted ? "Aktifkan Suara" : "Matikan Suara"}
      className="pixel-button flex items-center gap-1.5 bg-slate-950/70 border-2 border-slate-600 px-3 py-2 text-white hover:bg-slate-800 shadow-[2px_2px_0_#000] transition-colors"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 16 16"
        style={{ imageRendering: "pixelated", shapeRendering: "crispEdges" }}
      >
        {/* Speaker body - pixel voxel style */}
        <rect x="1" y="5" width="4" height="6" fill={muted ? "#4b5563" : "#22d3ee"} stroke="#000" strokeWidth="0.8" />
        <rect x="5" y="3" width="3" height="10" fill={muted ? "#374151" : "#06b6d4"} stroke="#000" strokeWidth="0.5" />
        {/* Sound waves OR mute X */}
        {!muted ? (
          <>
            <rect x="9" y="6" width="1" height="4" fill="#67e8f9" />
            <rect x="11" y="4" width="1" height="8" fill="#67e8f9" />
            <rect x="13" y="2" width="1" height="12" fill="#a5f3fc" />
          </>
        ) : (
          <>
            <rect x="9" y="6" width="2" height="2" fill="#ef4444" />
            <rect x="13" y="6" width="2" height="2" fill="#ef4444" />
            <rect x="11" y="8" width="2" height="2" fill="#ef4444" />
            <rect x="9" y="10" width="2" height="2" fill="#ef4444" />
            <rect x="13" y="10" width="2" height="2" fill="#ef4444" />
          </>
        )}
      </svg>
      <span className="pixel-text text-[9px]">{muted ? "BISU" : "SUARA"}</span>
    </button>
  );
}
