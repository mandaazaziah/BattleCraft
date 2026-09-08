 "use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSoundSystem } from "@/lib/useSound";

export default function Portal({ type, emoji, title, subtitle }: {
  type: "literasi" | "numerasi"; emoji: string; title: string; subtitle: string;
}) {
  const { play } = useSoundSystem();
  // Partikel putih/ungu melingkar kecil di dalam portal Minecraft
  const particles = [
    { top: "15%", left: "30%", size: 5, duration: 3.2, delay: 0 },
    { top: "70%", left: "65%", size: 6, duration: 4.0, delay: 0.4 },
    { top: "35%", left: "75%", size: 4, duration: 2.8, delay: 0.8 },
    { top: "80%", left: "20%", size: 6, duration: 3.6, delay: 1.2 },
    { top: "20%", left: "70%", size: 5, duration: 3.4, delay: 1.6 },
    { top: "50%", left: "15%", size: 5, duration: 3.8, delay: 0.6 },
    { top: "85%", left: "50%", size: 5, duration: 2.9, delay: 1.0 },
    { top: "45%", left: "45%", size: 6, duration: 4.2, delay: 1.4 },
  ];

  return (
    <Link href={`/battle/setup?category=${type}`} className="group" onClick={() => play("portal_open")}>
      <motion.div whileHover={{ y: -8, scale: 1.03 }} whileTap={{ scale: .96 }}
        className="relative flex flex-col items-center select-none">
        
        {/* Struktur Portal Gothic Bebatuan Abu Gelap (Persis Screenshot) */}
        <div className="relative flex flex-col items-center">
          
          {/* 1. Atap Puncak Segitiga / Stepped Gothic Arch (Dark Grey Stone Bricks) */}
          {/* Tingkat Paling Atas (2 Blok Tengah) */}
          <div className="flex justify-center z-20">
            <div className="w-12 h-5 mc-dark-stone-brick" />
          </div>
          {/* Tingkat 2 Atap */}
          <div className="flex justify-center -mt-[2px] z-20">
            <div className="w-24 h-5 mc-dark-stone-brick" />
          </div>
          {/* Tingkat 3 Atap */}
          <div className="flex justify-center -mt-[2px] z-20">
            <div className="w-36 h-5 mc-dark-stone-brick" />
          </div>
          {/* Balok Atas Melebar dengan Sayap Menjorok Keluar (Architraves) */}
          <div className="flex justify-center items-center -mt-[2px] z-20">
            <div className="w-6 h-6 mc-dark-stone-brick -mr-[2px]" />
            <div className="w-44 h-6 mc-dark-stone-brick" />
            <div className="w-6 h-6 mc-dark-stone-brick -ml-[2px]" />
          </div>

          {/* 2. Badan Tengah Portal: Sayap Kiri, Pilar Kiri, Area Nether Portal, Pilar Kanan, Sayap Kanan */}
          <div className="relative flex items-stretch -mt-[2px]">
            
            {/* Sayap Luar Kiri (Dinding Rendah dengan Ornamen Ujung) */}
            <div className="flex flex-col justify-end items-end w-7">
              <div className="w-5 h-6 mc-dark-stone-brick mb-2 -mr-1" />
              <div className="w-full h-8 mc-dark-stone-wall" />
            </div>

            {/* Pilar Batu Abu Gelap Kiri */}
            <div className="w-8 mc-dark-stone-brick relative z-20 flex flex-col justify-between items-center py-1">
              {/* Soul Lantern Luar (Kiri Bawah Menggantung dengan Rantai Panjang) */}
              <div className="absolute left-[-16px] top-6 flex flex-col items-center z-30">
                <div className="mc-chain h-24" />
                <div className="mc-soul-lantern">
                  <div className="mc-soul-lantern-glass animate-pulse" />
                </div>
              </div>

              {/* Soul Lantern Dalam (Kiri Atas Menggantung dengan Rantai Pendek) */}
              <div className="absolute right-[-14px] top-1 flex flex-col items-center z-30">
                <div className="mc-chain h-7" />
                <div className="mc-soul-lantern">
                  <div className="mc-soul-lantern-glass animate-pulse" />
                </div>
              </div>
            </div>

            {/* 3. AREA PORTAL NETHER UNGU DI TENGAH */}
            <div className="w-36 h-64 mc-nether-portal-bg relative overflow-hidden flex items-center justify-center border-y-2 border-[#120024] shadow-[inset_0_0_35px_#000000,0_0_25px_rgba(147,51,234,0.4)]">
              {/* Gelombang / Swirl Gradasi Ungu-Hitam */}
              <div className="absolute inset-[-40%] animate-portal-swirl opacity-80 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-fuchsia-500/50 via-purple-900/60 to-transparent pointer-events-none" />
              <div className="absolute inset-[-40%] animate-portal-swirl-reverse opacity-65 bg-[conic-gradient(from_0deg,_#2e0854,_#a855f7,_#090014,_#2e0854)] mix-blend-screen pointer-events-none" />

              {/* Partikel Putih Berputar / Swirl Minecraft */}
              {particles.map((p, idx) => (
                <motion.div
                  key={idx}
                  className="absolute rounded-full bg-white shadow-[0_0_8px_#ffffff,0_0_12px_#d8b4fe] pointer-events-none"
                  style={{
                    width: p.size,
                    height: p.size,
                    top: p.top,
                    left: p.left,
                  }}
                  animate={{
                    x: [0, 10, 0, -10, 0],
                    y: [0, -10, 0, 10, 0],
                    scale: [0.6, 1.25, 0.7, 1.15, 0.6],
                    opacity: [0.25, 0.95, 0.35, 0.9, 0.25],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: p.duration,
                    delay: p.delay,
                    ease: "easeInOut",
                  }}
                />
              ))}

              {/* Icon / Tampilan Tengah Sesuai Kategori */}
              {type === "literasi" ? (
                /* Magic Pixel Enchantment Book Melayang (Minecraft Enchanted Book Style - Khusus Literasi) */
                <motion.div 
                  animate={{ 
                    y: [-6, 6, -6],
                    rotate: [-1.5, 1.5, -1.5]
                  }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="relative z-10 flex items-center justify-center filter drop-shadow-[0_0_18px_rgba(6,182,212,0.85)] drop-shadow-[0_0_30px_rgba(168,85,247,0.7)]"
                >
                  {/* Partikel Magis Halus di sekitar buku */}
                  {[
                    { top: -10, left: 10, size: 4, dur: 2.1, delay: 0, color: "#67e8f9" },
                    { top: -6, right: 6, size: 5, dur: 2.7, delay: 0.5, color: "#d8b4fe" },
                    { bottom: -8, left: 14, size: 4, dur: 2.4, delay: 1.0, color: "#a5f3fc" },
                    { bottom: -6, right: 12, size: 5, dur: 3.0, delay: 1.5, color: "#e879f9" },
                    { top: "40%", left: -10, size: 4, dur: 2.5, delay: 0.8, color: "#38bdf8" },
                    { top: "45%", right: -12, size: 4, dur: 2.8, delay: 1.2, color: "#c084fc" },
                  ].map((sp, sIdx) => (
                    <motion.div
                      key={sIdx}
                      className="absolute pointer-events-none rounded-[1px]"
                      style={{
                        width: sp.size,
                        height: sp.size,
                        top: sp.top,
                        bottom: sp.bottom,
                        left: sp.left,
                        right: sp.right,
                        backgroundColor: sp.color,
                        boxShadow: `0 0 6px ${sp.color}`,
                      }}
                      animate={{
                        y: [0, -12, 0],
                        x: [0, (sIdx % 2 === 0 ? 5 : -5), 0],
                        scale: [0.5, 1.3, 0.5],
                        opacity: [0.2, 1, 0.2],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: sp.dur,
                        delay: sp.delay,
                        ease: "easeInOut",
                      }}
                    />
                  ))}

                  {/* Pixel Art Enchanted Book + Quill Pen SVG */}
                  <svg
                    width="78"
                    height="68"
                    viewBox="0 0 32 28"
                    className="w-16 h-14 md:w-20 md:h-16"
                    style={{ imageRendering: "pixelated", shapeRendering: "crispEdges" }}
                  >
                    <defs>
                      <filter id="cyan-glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="1" result="glow" />
                        <feComposite in="SourceGraphic" in2="glow" operator="over" />
                      </filter>
                    </defs>

                    {/* === ENCHANTED BOOK BASE === */}
                    {/* Outer Leather Cover (Dark Red / Brown Minecraft Spellbook) */}
                    <rect x="2" y="7" width="28" height="17" fill="#3a111a" />
                    <rect x="3" y="6" width="26" height="1" fill="#4d1622" />
                    <rect x="3" y="24" width="26" height="1" fill="#250910" />

                    {/* Book Spine (Tengah) */}
                    <rect x="15" y="6" width="2" height="19" fill="#24070e" />
                    <rect x="15" y="8" width="2" height="1" fill="#eab308" />
                    <rect x="15" y="16" width="2" height="1" fill="#eab308" />

                    {/* Leather Cover Rim Trim (Gold Corners) */}
                    <rect x="3" y="7" width="2" height="2" fill="#d97706" />
                    <rect x="27" y="7" width="2" height="2" fill="#d97706" />
                    <rect x="3" y="22" width="2" height="2" fill="#92400e" />
                    <rect x="27" y="22" width="2" height="2" fill="#92400e" />

                    {/* === GLOWING CYAN PAGES (Halaman Sihir Terbuka) === */}
                    {/* Halaman Kiri */}
                    <rect x="4" y="8" width="10" height="14" fill="#083344" />
                    <rect x="5" y="8" width="9" height="13" fill="#0e7490" />
                    <rect x="6" y="9" width="8" height="11" fill="#06b6d4" />
                    <rect x="7" y="10" width="6" height="9" fill="#22d3ee" />
                    <rect x="8" y="11" width="4" height="6" fill="#a5f3fc" />

                    {/* Halaman Kanan */}
                    <rect x="18" y="8" width="10" height="14" fill="#083344" />
                    <rect x="18" y="8" width="9" height="13" fill="#0e7490" />
                    <rect x="18" y="9" width="8" height="11" fill="#06b6d4" />
                    <rect x="19" y="10" width="6" height="9" fill="#22d3ee" />
                    <rect x="20" y="11" width="4" height="6" fill="#a5f3fc" />

                    {/* Baris Rune / Teks Sihir Pixel (Cyan-Ungu Berpendar) */}
                    <rect x="7" y="12" width="4" height="1" fill="#ecfeff" />
                    <rect x="7" y="14" width="5" height="1" fill="#083344" />
                    <rect x="7" y="16" width="3" height="1" fill="#cffafe" />

                    <rect x="20" y="12" width="4" height="1" fill="#ecfeff" />
                    <rect x="19" y="14" width="5" height="1" fill="#083344" />
                    <rect x="20" y="16" width="3" height="1" fill="#cffafe" />

                    {/* Rune Magis Tengah Halaman */}
                    <rect x="9" y="13" width="1" height="2" fill="#67e8f9" />
                    <rect x="21" y="13" width="1" height="2" fill="#67e8f9" />

                    {/* === PIXEL ART QUILL PEN (Pena Bulu) === */}
                    {/* Feather Shaft & Barb (Bulu Putih/Cyan Berdiri di Sisi Kanan Buku) */}
                    <rect x="25" y="0" width="2" height="2" fill="#ffffff" />
                    <rect x="27" y="1" width="2" height="2" fill="#e0f2fe" />
                    <rect x="24" y="2" width="3" height="2" fill="#ffffff" />
                    <rect x="26" y="3" width="2" height="2" fill="#bae6fd" />
                    <rect x="23" y="4" width="3" height="2" fill="#e0f2fe" />
                    <rect x="25" y="5" width="2" height="2" fill="#7dd3fc" />
                    <rect x="22" y="6" width="3" height="2" fill="#bae6fd" />
                    {/* Quill Spine & Ink Tip */}
                    <rect x="22" y="7" width="2" height="2" fill="#38bdf8" />
                    <rect x="21" y="9" width="2" height="2" fill="#0284c7" />
                    <rect x="20" y="11" width="2" height="2" fill="#0f172a" />
                    {/* Tetesan Tinta Sihir Ungu/Cyan di Ujung Pena */}
                    <rect x="20" y="13" width="1" height="1" fill="#a855f7" />
                  </svg>
                </motion.div>
              ) : type === "numerasi" ? (
                /* Magic Pixel Math Block Melayang (Minecraft Isometric Math Cube Style - Khusus Numerasi) */
                <motion.div 
                  animate={{ 
                    y: [-6, 6, -6],
                    rotate: [-1.5, 1.5, -1.5]
                  }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="relative z-10 flex items-center justify-center filter drop-shadow-[0_0_18px_rgba(6,182,212,0.9)] drop-shadow-[0_0_30px_rgba(168,85,247,0.7)]"
                >
                  {/* Partikel Magis Halus di sekitar kubus */}
                  {[
                    { top: -8, left: 8, size: 4, dur: 2.2, delay: 0.1, color: "#67e8f9" },
                    { top: -5, right: 6, size: 5, dur: 2.6, delay: 0.6, color: "#d8b4fe" },
                    { bottom: -8, left: 10, size: 4, dur: 2.4, delay: 1.1, color: "#a5f3fc" },
                    { bottom: -6, right: 10, size: 5, dur: 2.9, delay: 1.6, color: "#e879f9" },
                    { top: "42%", left: -10, size: 4, dur: 2.5, delay: 0.7, color: "#38bdf8" },
                    { top: "46%", right: -10, size: 4, dur: 2.7, delay: 1.3, color: "#c084fc" },
                  ].map((sp, sIdx) => (
                    <motion.div
                      key={sIdx}
                      className="absolute pointer-events-none rounded-[1px]"
                      style={{
                        width: sp.size,
                        height: sp.size,
                        top: sp.top,
                        bottom: sp.bottom,
                        left: sp.left,
                        right: sp.right,
                        backgroundColor: sp.color,
                        boxShadow: `0 0 6px ${sp.color}`,
                      }}
                      animate={{
                        y: [0, -12, 0],
                        x: [0, (sIdx % 2 === 0 ? 5 : -5), 0],
                        scale: [0.5, 1.3, 0.5],
                        opacity: [0.2, 1, 0.2],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: sp.dur,
                        delay: sp.delay,
                        ease: "easeInOut",
                      }}
                    />
                  ))}

                  {/* Pixel Art Isometric Magic Math Cube SVG */}
                  <svg
                    width="76"
                    height="76"
                    viewBox="0 0 32 32"
                    className="w-16 h-16 md:w-20 md:h-20"
                    style={{ imageRendering: "pixelated", shapeRendering: "crispEdges" }}
                  >
                    {/* === ISOMETRIC CUBE BASE === */}
                    {/* Sisi Atas (Top Face - Cyan Berpendar Terang) */}
                    <polygon
                      points="16,2 30,9 16,16 2,9"
                      fill="#0e7490"
                      stroke="#22d3ee"
                      strokeWidth="1"
                    />
                    {/* Inner Top highlight */}
                    <polygon
                      points="16,4 27,9.5 16,15 5,9.5"
                      fill="#06b6d4"
                    />
                    <polygon
                      points="16,5 24,9 16,13 8,9"
                      fill="#67e8f9"
                    />

                    {/* Sisi Kiri (Left Face - Deepslate/Obsidian Biru Tua) */}
                    <polygon
                      points="2,9 16,16 16,30 2,23"
                      fill="#083344"
                      stroke="#22d3ee"
                      strokeWidth="1"
                    />
                    {/* Shading Sisi Kiri */}
                    <polygon
                      points="3,11 15,17 15,28 3,22"
                      fill="#0c4a6e"
                    />

                    {/* Sisi Kanan (Right Face - Sedang) */}
                    <polygon
                      points="16,16 30,9 30,23 16,30"
                      fill="#0f172a"
                      stroke="#22d3ee"
                      strokeWidth="1"
                    />
                    {/* Shading Sisi Kanan */}
                    <polygon
                      points="17,17 29,11 29,22 17,28"
                      fill="#164e63"
                    />

                    {/* Glowing Cyan Edges & Corner Gem Pixels */}
                    <rect x="15" y="1" width="2" height="2" fill="#a5f3fc" />
                    <rect x="1" y="8" width="2" height="2" fill="#22d3ee" />
                    <rect x="29" y="8" width="2" height="2" fill="#22d3ee" />
                    <rect x="15" y="15" width="2" height="2" fill="#a5f3fc" />
                    <rect x="1" y="22" width="2" height="2" fill="#0891b2" />
                    <rect x="29" y="22" width="2" height="2" fill="#0891b2" />
                    <rect x="15" y="29" width="2" height="2" fill="#22d3ee" />

                    {/* === SIMBOL MATEMATIKA PIXEL BERPENDAR (+ − × ÷) === */}

                    {/* 1. SISI ATAS: Simbol '÷' (Division) & '×' (Multiply) Rune Pixel */}
                    {/* Simbol Titik Atas */}
                    <rect x="15" y="6" width="2" height="1" fill="#ecfeff" />
                    {/* Garis Bagi */}
                    <rect x="13" y="8" width="6" height="1" fill="#ffffff" />
                    {/* Simbol Titik Bawah */}
                    <rect x="15" y="10" width="2" height="1" fill="#ecfeff" />

                    {/* 2. SISI KIRI: Simbol '+' (Plus) Pixel Glowing White/Cyan */}
                    {/* Batang Vertikal '+' */}
                    <rect x="8" y="15" width="2" height="8" fill="#ffffff" />
                    <rect x="7" y="15" width="1" height="8" fill="#a5f3fc" />
                    {/* Batang Horizontal '+' */}
                    <rect x="5" y="18" width="8" height="2" fill="#ffffff" />
                    <rect x="5" y="17" width="8" height="1" fill="#cffafe" />
                    <rect x="5" y="20" width="8" height="1" fill="#38bdf8" />
                    {/* Inti Tengah '+' */}
                    <rect x="8" y="18" width="2" height="2" fill="#ecfeff" />

                    {/* 3. SISI KANAN: Simbol '−' (Minus) & '×' (Multiply) Pixel Glowing */}
                    {/* Simbol '−' (Minus) di bagian atas sisi kanan */}
                    <rect x="20" y="15" width="7" height="2" fill="#ffffff" />
                    <rect x="20" y="14" width="7" height="1" fill="#cffafe" />
                    <rect x="20" y="17" width="7" height="1" fill="#38bdf8" />

                    {/* Simbol '×' (Kali) di bagian bawah sisi kanan */}
                    <rect x="20" y="21" width="2" height="2" fill="#ffffff" />
                    <rect x="25" y="21" width="2" height="2" fill="#ffffff" />
                    <rect x="22" y="23" width="3" height="2" fill="#a5f3fc" />
                    <rect x="20" y="25" width="2" height="2" fill="#ffffff" />
                    <rect x="25" y="25" width="2" height="2" fill="#ffffff" />
                  </svg>
                </motion.div>
              ) : (
                /* Icon / Emoji Kategori Default */
                <motion.div 
                  animate={{ scale: [1, 1.08, 1], y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                  className="relative z-10"
                >
                  <span className="text-5xl filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)] drop-shadow-[0_0_15px_rgba(232,121,249,0.9)]">
                    {emoji}
                  </span>
                </motion.div>
              )}
            </div>

            {/* Pilar Batu Abu Gelap Kanan */}
            <div className="w-8 mc-dark-stone-brick relative z-20 flex flex-col justify-between items-center py-1">
              {/* Soul Lantern Dalam (Kanan Atas Menggantung dengan Rantai Pendek) */}
              <div className="absolute left-[-14px] top-1 flex flex-col items-center z-30">
                <div className="mc-chain h-7" />
                <div className="mc-soul-lantern">
                  <div className="mc-soul-lantern-glass animate-pulse" />
                </div>
              </div>

              {/* Soul Lantern Luar (Kanan Bawah Menggantung dengan Rantai Panjang) */}
              <div className="absolute right-[-16px] top-6 flex flex-col items-center z-30">
                <div className="mc-chain h-24" />
                <div className="mc-soul-lantern">
                  <div className="mc-soul-lantern-glass animate-pulse" />
                </div>
              </div>
            </div>

            {/* Sayap Luar Kanan (Dinding Rendah dengan Ornamen Ujung) */}
            <div className="flex flex-col justify-end items-start w-7">
              <div className="w-5 h-6 mc-dark-stone-brick mb-2 -ml-1" />
              <div className="w-full h-8 mc-dark-stone-wall" />
            </div>
          </div>

          {/* 4. Bagian Bawah / Tangga Depan Portal (Dark Stone Steps) */}
          <div className="w-full flex justify-center z-20 -mt-[2px]">
            <div className="w-48 h-5 mc-dark-stone-brick" />
          </div>
        </div>

        {/* Label Judul & Subtitle Pixel */}
        <div className="mt-3 flex flex-col items-center gap-2">
          <div className="pixel-text text-center text-lg text-white drop-shadow-[2px_2px_0_#000]">{title}</div>
          <div className="border-2 border-cyan-900 bg-slate-950/85 px-4 py-1 text-cyan-300 font-bold tracking-wider shadow-[3px_3px_0_#000]">
            {subtitle}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}