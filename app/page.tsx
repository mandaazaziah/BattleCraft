 "use client";
import { motion } from "framer-motion";
import Portal from "@/components/Portal";
import SoundButton from "@/components/SoundButton";
import PixelButton from "@/components/PixelButton";

export default function Home() {
  return (
    <main className="sky relative min-h-screen overflow-hidden">
      {/* Overlay gradien halus agar konten portal dan teks kontras terbaca */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

      <div className="relative z-10 min-h-screen flex flex-col">
        <header className="flex items-center justify-between p-5">
          <div className="pixel-text text-xs md:text-sm text-yellow-300 drop-shadow-[2px_2px_0_#000]">⚔️ BATTLECRAFT</div>
          <div className="flex gap-2 items-center">
            <SoundButton />
            <PixelButton href="/admin/login" className="bg-slate-100 text-sm">⚙ Admin Guru</PixelButton>
          </div>
        </header>

        <section className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
          <motion.div initial={{opacity:0,y:-25}} animate={{opacity:1,y:0}} className="text-center mb-10">
            <div className="mb-2 text-5xl filter drop-shadow-md">⛏️ 🌳 🏰</div>
            <h1 className="pixel-text text-3xl md:text-5xl text-white drop-shadow-[4px_4px_0_#000]">BATTLECRAFT</h1>
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