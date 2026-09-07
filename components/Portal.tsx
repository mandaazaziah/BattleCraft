 "use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Portal({ type, emoji, title, subtitle }: {
  type: "literasi" | "numerasi"; emoji: string; title: string; subtitle: string;
}) {
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
    <Link href={`/battle/setup?category=${type}`} className="group">
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

              {/* Icon / Emoji Kategori */}
              <motion.div 
                animate={{ scale: [1, 1.08, 1], y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                className="relative z-10"
              >
                <span className="text-5xl filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)] drop-shadow-[0_0_15px_rgba(232,121,249,0.9)]">
                  {emoji}
                </span>
              </motion.div>
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