 "use client";
import { motion } from "framer-motion";
import { useEffect } from "react";
import Portal from "@/components/Portal";
import SoundButton from "@/components/SoundButton";
import PixelButton from "@/components/PixelButton";
import { useSoundSystem } from "@/lib/useSound";

export default function Home() {
  const { play } = useSoundSystem();
  useEffect(() => {
    const t = setTimeout(() => play("home_enter"), 400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <main className="sky relative min-h-screen overflow-hidden">
      {/* Overlay gradien halus agar konten portal dan teks kontras terbaca */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

      <div className="relative z-10 min-h-screen flex flex-col">
        <header className="flex items-center justify-between p-5">
          <div />
          <div className="flex gap-2 items-center">
            <SoundButton />
            <PixelButton href="/admin/login" className="bg-slate-100 text-sm">⚙ Admin Guru</PixelButton>
          </div>
        </header>

        <section className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
          <motion.div initial={{opacity:0,y:-25}} animate={{opacity:1,y:0}} className="text-center mb-10">
            {/* 3D Voxel Pixel Art Decor Items di atas Judul */}
            <div className="flex items-center justify-center gap-6 md:gap-8 mb-3">
              {/* 1. Kiri: Voxel Diamond Pickaxe 3D */}
              <motion.div
                animate={{ y: [-3, 3, -3], rotate: [-2, 2, -2] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)] drop-shadow-[0_0_12px_rgba(6,182,212,0.4)]"
              >
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 32 32"
                  className="w-11 h-11 md:w-13 md:h-13"
                  style={{ imageRendering: "pixelated", shapeRendering: "crispEdges" }}
                >
                  {/* Pickaxe Head Outline */}
                  <rect x="18" y="2" width="12" height="4" fill="#083344" />
                  <rect x="26" y="6" width="4" height="8" fill="#083344" />
                  <rect x="10" y="2" width="9" height="4" fill="#083344" />
                  <rect x="2" y="10" width="4" height="8" fill="#083344" />
                  <rect x="6" y="6" width="5" height="5" fill="#083344" />

                  {/* Pickaxe Diamond Head 3D Voxel Facets */}
                  {/* Bagian Kanan / Atas */}
                  <rect x="19" y="3" width="10" height="2" fill="#22d3ee" />
                  <rect x="20" y="3" width="7" height="1" fill="#a5f3fc" />
                  <rect x="27" y="5" width="2" height="8" fill="#06b6d4" />
                  <rect x="28" y="6" width="1" height="6" fill="#0891b2" />
                  <rect x="27" y="13" width="1" height="2" fill="#164e63" />

                  {/* Bagian Kiri / Bawah */}
                  <rect x="11" y="3" width="8" height="2" fill="#06b6d4" />
                  <rect x="7" y="7" width="3" height="3" fill="#22d3ee" />
                  <rect x="3" y="11" width="2" height="6" fill="#0891b2" />
                  <rect x="3" y="11" width="1" height="4" fill="#22d3ee" />
                  <rect x="4" y="17" width="1" height="2" fill="#164e63" />

                  {/* Head Core Gem Accent */}
                  <rect x="14" y="5" width="5" height="5" fill="#0e7490" />
                  <rect x="15" y="6" width="3" height="3" fill="#22d3ee" />
                  <rect x="16" y="7" width="1" height="1" fill="#ffffff" />

                  {/* Wooden Stick Shaft (Voxel Cubes 3D Shaded) */}
                  <rect x="13" y="9" width="4" height="4" fill="#27180c" />
                  <rect x="14" y="10" width="2" height="2" fill="#854d0e" />
                  <rect x="14" y="10" width="1" height="1" fill="#d97706" />

                  <rect x="10" y="12" width="4" height="4" fill="#27180c" />
                  <rect x="11" y="13" width="2" height="2" fill="#854d0e" />
                  <rect x="11" y="13" width="1" height="1" fill="#d97706" />

                  <rect x="7" y="15" width="4" height="4" fill="#27180c" />
                  <rect x="8" y="16" width="2" height="2" fill="#854d0e" />
                  <rect x="8" y="16" width="1" height="1" fill="#d97706" />

                  <rect x="4" y="18" width="4" height="4" fill="#27180c" />
                  <rect x="5" y="19" width="2" height="2" fill="#854d0e" />
                  <rect x="5" y="19" width="1" height="1" fill="#d97706" />

                  <rect x="1" y="21" width="4" height="4" fill="#27180c" />
                  <rect x="2" y="22" width="2" height="2" fill="#713f12" />
                  <rect x="2" y="22" width="1" height="1" fill="#b45309" />
                </svg>
              </motion.div>

              {/* 2. Tengah: Voxel 3D Isometric Green Tree */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ repeat: Infinity, duration: 3.4, ease: "easeInOut", delay: 0.3 }}
                className="filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)] drop-shadow-[0_0_12px_rgba(34,197,94,0.4)]"
              >
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 32 32"
                  className="w-11 h-11 md:w-13 md:h-13"
                  style={{ imageRendering: "pixelated", shapeRendering: "crispEdges" }}
                >
                  {/* --- Foliage Top Layer (Voxel Cube) --- */}
                  <polygon points="16,2 24,6 16,10 8,6" fill="#86efac" stroke="#14532d" strokeWidth="0.8" />
                  <polygon points="8,6 16,10 16,16 8,12" fill="#22c55e" stroke="#14532d" strokeWidth="0.8" />
                  <polygon points="16,10 24,6 24,12 16,16" fill="#15803d" stroke="#14532d" strokeWidth="0.8" />
                  {/* Top Highlight Pixel */}
                  <rect x="15" y="4" width="2" height="2" fill="#bbf7d0" />

                  {/* --- Foliage Middle / Bottom Wider Layer (Voxel Cubes) --- */}
                  <polygon points="16,7 28,13 16,19 4,13" fill="#4ade80" stroke="#14532d" strokeWidth="0.8" />
                  <polygon points="4,13 16,19 16,25 4,19" fill="#16a34a" stroke="#14532d" strokeWidth="0.8" />
                  <polygon points="16,19 28,13 28,19 16,25" fill="#14532d" stroke="#052e16" strokeWidth="0.8" />
                  {/* Leaves Pixel Texture Details */}
                  <rect x="9" y="16" width="2" height="2" fill="#86efac" />
                  <rect x="21" y="16" width="2" height="2" fill="#166534" />

                  {/* --- Wood Trunk (Voxel Column) --- */}
                  <polygon points="16,23 20,25 16,27 12,25" fill="#a16207" stroke="#451a03" strokeWidth="0.8" />
                  <polygon points="12,25 16,27 16,31 12,29" fill="#78350f" stroke="#451a03" strokeWidth="0.8" />
                  <polygon points="16,27 20,25 20,29 16,31" fill="#451a03" stroke="#270c01" strokeWidth="0.8" />
                  {/* Ground Voxel Shadow */}
                  <ellipse cx="16" cy="31" rx="8" ry="1" fill="#052e16" opacity="0.6" />
                </svg>
              </motion.div>

              {/* 3. Kanan: Voxel 3D Fantasy Castle dengan Bendera Berwarna-warni */}
              <motion.div
                animate={{ y: [-3, 3, -3], rotate: [2, -2, 2] }}
                transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut", delay: 0.6 }}
                className="filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)] drop-shadow-[0_0_12px_rgba(234,179,8,0.4)]"
              >
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 32 32"
                  className="w-11 h-11 md:w-13 md:h-13"
                  style={{ imageRendering: "pixelated", shapeRendering: "crispEdges" }}
                >
                  {/* --- Benteng Utama & Menara Kiri (Stone Bricks Voxel) --- */}
                  {/* Menara Kiri */}
                  <rect x="3" y="10" width="7" height="18" fill="#475569" stroke="#0f172a" strokeWidth="0.8" />
                  <rect x="4" y="11" width="5" height="16" fill="#64748b" />
                  {/* Crenellations (Gigi Benteng) Kiri */}
                  <rect x="3" y="8" width="2" height="2" fill="#94a3b8" stroke="#0f172a" strokeWidth="0.6" />
                  <rect x="8" y="8" width="2" height="2" fill="#94a3b8" stroke="#0f172a" strokeWidth="0.6" />
                  {/* Jendela Panah Kiri */}
                  <rect x="6" y="15" width="1" height="3" fill="#0f172a" />

                  {/* Menara Kanan */}
                  <rect x="22" y="10" width="7" height="18" fill="#334155" stroke="#0f172a" strokeWidth="0.8" />
                  <rect x="23" y="11" width="5" height="16" fill="#475569" />
                  {/* Crenellations Kanan */}
                  <rect x="22" y="8" width="2" height="2" fill="#64748b" stroke="#0f172a" strokeWidth="0.6" />
                  <rect x="27" y="8" width="2" height="2" fill="#64748b" stroke="#0f172a" strokeWidth="0.6" />
                  {/* Jendela Panah Kanan */}
                  <rect x="25" y="15" width="1" height="3" fill="#0f172a" />

                  {/* Dinding Tengah & Gerbang Lengkung */}
                  <rect x="10" y="14" width="12" height="14" fill="#475569" stroke="#0f172a" strokeWidth="0.8" />
                  <rect x="11" y="15" width="10" height="12" fill="#64748b" />
                  {/* Dinding Atas Tengah (Crenellations) */}
                  <rect x="11" y="12" width="2" height="2" fill="#94a3b8" />
                  <rect x="15" y="12" width="2" height="2" fill="#94a3b8" />
                  <rect x="19" y="12" width="2" height="2" fill="#94a3b8" />
                  {/* Pintu Gerbang Kayu Melengkung */}
                  <rect x="13" y="21" width="6" height="7" fill="#1e293b" />
                  <rect x="14" y="22" width="4" height="6" fill="#78350f" />
                  <rect x="15" y="22" width="2" height="6" fill="#451a03" />

                  {/* --- Menara Utama Tengah (Tinggi) --- */}
                  <rect x="12" y="5" width="8" height="9" fill="#64748b" stroke="#0f172a" strokeWidth="0.8" />
                  <rect x="13" y="6" width="6" height="7" fill="#94a3b8" />
                  <rect x="12" y="3" width="2" height="2" fill="#cbd5e1" />
                  <rect x="15" y="3" width="2" height="2" fill="#cbd5e1" />
                  <rect x="18" y="3" width="2" height="2" fill="#cbd5e1" />

                  {/* --- Bendera Berwarna-warni (Pixel Flags) --- */}
                  {/* Tiang & Bendera Menara Tengah (Merah/Emas) */}
                  <rect x="15" y="0" width="1" height="3" fill="#e2e8f0" />
                  <polygon points="16,0 20,1.5 16,3" fill="#ef4444" stroke="#b91c1c" strokeWidth="0.5" />
                  <rect x="16" y="1" width="2" height="1" fill="#fbbf24" />

                  {/* Tiang & Bendera Menara Kiri (Cyan/Biru) */}
                  <rect x="5" y="5" width="1" height="3" fill="#e2e8f0" />
                  <polygon points="6,5 9,6.5 6,8" fill="#06b6d4" stroke="#0891b2" strokeWidth="0.5" />

                  {/* Tiang & Bendera Menara Kanan (Kuning/Emas) */}
                  <rect x="25" y="5" width="1" height="3" fill="#e2e8f0" />
                  <polygon points="26,5 29,6.5 26,8" fill="#eab308" stroke="#ca8a04" strokeWidth="0.5" />
                </svg>
              </motion.div>
            </div>
            <h1 className="pixel-text text-3xl md:text-5xl text-white drop-shadow-[4px_4px_0_#000]">BATTLE-CRAFT</h1>
            <p className="mt-3 text-2xl text-yellow-100 font-bold drop-shadow-[2px_2px_0_#000]">Petualangan belajar dimulai di sini!</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            <Portal type="literasi" emoji="📖" title="LITERASI" subtitle="Enter World" />
            <Portal type="numerasi" emoji="🔢" title="NUMERASI" subtitle="Enter World" />
          </div>
        </section>
        <footer className="text-center pb-5 text-white/90 font-bold drop-shadow-[1px_1px_0_#000]">Choose your world • Learn • Battle • Win</footer>
      </div>
    </main>
  );
}