 "use client";

import { motion } from "framer-motion";

type Props = {
  team: "A" | "B";
  attacking?: boolean;
  hit?: boolean;
};

// Komponen Trisula Minecraft Asli (Minecraft Loyalty Trident) untuk Team A
function MinecraftTrident() {
  return (
    <div className="relative w-14 h-14 select-none filter drop-shadow-[2px_2px_0px_#000]">
      {/* 3 Mata Trisula Cyan/Prismarine */}
      <div className="absolute top-0 left-1 w-2.5 h-6 bg-[#2dd4bf] border-2 border-[#0f766e] shadow-[inset_1px_1px_0px_#ffffff]" />
      <div className="absolute top-[-4px] left-4 w-2.5 h-8 bg-[#5eead4] border-2 border-[#0f766e] shadow-[inset_1px_1px_0px_#ffffff]" />
      <div className="absolute top-0 left-7 w-2.5 h-6 bg-[#2dd4bf] border-2 border-[#0f766e] shadow-[inset_1px_1px_0px_#ffffff]" />
      {/* Crossbar Penghubung Trisula */}
      <div className="absolute top-5 left-1 w-9 h-2.5 bg-[#0f766e] border border-black" />
      {/* Gagang Panjang Trisula (Prismarine Shaft) */}
      <div className="absolute top-7 left-4 w-2.5 h-9 bg-[#115e59] border border-black" />
    </div>
  );
}

// Komponen Busur Panah Minecraft (Minecraft Bow & Arrow) untuk Team B
function MinecraftBow() {
  return (
    <div className="relative w-14 h-14 select-none filter drop-shadow-[2px_2px_0px_#000]">
      {/* Busur Kayu Melengkung */}
      <div className="absolute inset-1 border-r-[5px] border-t-[5px] border-[#78350f] rounded-tr-3xl shadow-[inset_1px_1px_0px_#d97706]" />
      {/* Tali Busur (Bowstring) */}
      <div className="absolute top-1 right-1 w-11 h-11 border-b-2 border-l-2 border-slate-200/90" />
      {/* Anak Panah Siap Meluncur */}
      <div className="absolute top-4 right-1 w-10 h-2 bg-[#92400e] border border-black transform rotate-45 flex items-center">
        <div className="absolute -left-2 w-3.5 h-3.5 bg-[#4b5563] border border-black transform rotate-45" />
        <div className="absolute -right-2 w-2.5 h-3 bg-white border border-black" />
      </div>
    </div>
  );
}

export default function Character({ team, attacking = false, hit = false }: Props) {
  const isTeamA = team === "A";

  // Palette Skin Resmi Minecraft: Steve (Team A) vs Alex (Team B)
  const skin = isTeamA ? "#c49366" : "#e0a87c";
  const shirt = isTeamA ? "#00a8a8" : "#5b8731"; // Steve Cyan Teal vs Alex Green Tunic
  const pants = isTeamA ? "#2b3b8c" : "#755030"; // Steve Blue Jeans vs Alex Brown Pants
  const hair = isTeamA ? "#442a15" : "#c96628"; // Steve Dark Brown vs Alex Ginger Orange
  const shoes = "#423e3e";

  return (
    <motion.div
      className="relative h-48 w-32 select-none flex flex-col items-center"
      animate={
        hit
          ? {
              x: [0, isTeamA ? -20 : 20, isTeamA ? 12 : -12, 0],
              rotate: [0, isTeamA ? -16 : 16, 0],
              filter: ["brightness(1)", "brightness(2.2) drop-shadow(0 0 12px red)", "brightness(1)"],
            }
          : attacking
          ? {
              x: [0, isTeamA ? 40 : -40, isTeamA ? 20 : -20, 0],
              y: [0, -10, 0],
            }
          : {
              y: [0, -3, 0],
            }
      }
      transition={{
        duration: attacking || hit ? 0.5 : 2,
        repeat: attacking || hit ? 0 : Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Bayangan Blok (Pixel Shadow) */}
      <div className="absolute bottom-0 w-24 h-4 bg-black/40 rounded-full blur-[2px]" />

      {/* 1. KEPALA MINECRAFT 3D VOXEL LOOK */}
      <div
        className="relative w-16 h-16 border-4 border-black z-20 shadow-[4px_4px_0px_rgba(0,0,0,0.5)]"
        style={{ backgroundColor: skin }}
      >
        {/* Rambut Minecraft */}
        <div
          className="absolute inset-x-0 top-0 h-6 border-b-2 border-black"
          style={{ backgroundColor: hair }}
        >
          {/* Layer Rambut Samping */}
          <div className="absolute -bottom-2 left-0 w-2.5 h-3" style={{ backgroundColor: hair }} />
          <div className="absolute -bottom-2 right-0 w-2.5 h-3" style={{ backgroundColor: hair }} />
        </div>

        {/* Mata Pixel Minecraft (Putih + Pupil Biru/Hijau) */}
        <div className="absolute left-2.5 top-7 w-3.5 h-2.5 bg-white border border-black/40 flex items-center">
          <div className={`w-2 h-full ${isTeamA ? "bg-[#28498f]" : "bg-[#1f7035]"}`} />
        </div>
        <div className="absolute right-2.5 top-7 w-3.5 h-2.5 bg-white border border-black/40 flex items-center justify-end">
          <div className={`w-2 h-full ${isTeamA ? "bg-[#28498f]" : "bg-[#1f7035]"}`} />
        </div>

        {/* Kumis Steve / Senyum Alex */}
        {isTeamA ? (
          <div className="absolute left-1/2 -translate-x-1/2 top-11 w-4 h-1.5 bg-[#59341b] border border-black/40" />
        ) : (
          <div className="absolute left-1/2 -translate-x-1/2 top-11 w-3 h-1 bg-[#a35e38]" />
        )}
      </div>

      {/* 2. BADAN & TANGAN MINECRAFT (TORSO & ARMS WITH WEAPONS) */}
      <div className="relative flex items-start z-10 -mt-1">
        {/* Tangan Kiri */}
        <motion.div
          className="w-5 h-16 border-4 border-black border-r-0 relative"
          style={{ backgroundColor: isTeamA ? shirt : skin }}
          animate={
            attacking && !isTeamA
              ? { rotate: [-10, 80, -10] }
              : { rotate: [0, isTeamA ? 6 : -6, 0] }
          }
          transition={{ duration: 0.5 }}
        >
          <div className="w-full h-8 mt-4" style={{ backgroundColor: skin }} />
        </motion.div>

        {/* Badan (Torso) */}
        <div
          className="w-16 h-16 border-4 border-black flex flex-col justify-between shadow-[2px_2px_0px_rgba(0,0,0,0.4)]"
          style={{ backgroundColor: shirt }}
        >
          {/* Kerah Baju V-Neck Khas Steve / Alex */}
          <div className="w-6 h-3 mx-auto border-b-2 border-x-2 border-black/40" style={{ backgroundColor: skin }} />
          {/* Sabuk Minecraft */}
          <div className="w-full h-2.5 bg-black/40 border-t border-black/60" />
        </div>

        {/* Tangan Kanan (Memegang Senjata Pixel Diamond Sword / Bow) */}
        <motion.div
          className="w-5 h-16 border-4 border-black border-l-0 relative"
          style={{ backgroundColor: !isTeamA ? shirt : skin }}
          animate={
            attacking && isTeamA
              ? { rotate: [10, -85, 10] }
              : { rotate: [0, isTeamA ? -6 : 6, 0] }
          }
          transition={{ duration: 0.5 }}
        >
          <div className="w-full h-8 mt-4" style={{ backgroundColor: skin }} />

          {/* Senjata Asli Minecraft di Tangan */}
          <div className={`absolute -bottom-4 ${isTeamA ? "-right-7 rotate-12" : "-left-7"} z-30`}>
            {isTeamA ? <MinecraftTrident /> : <MinecraftBow />}
          </div>
        </motion.div>
      </div>

      {/* 3. KAKI CELANA & SEPATU PIXEL (LEGS & BOOTS) */}
      <div className="flex gap-1 -mt-1 z-10">
        <div className="w-7 h-14 border-4 border-black flex flex-col justify-end" style={{ backgroundColor: pants }}>
          <div className="w-full h-4 border-t-2 border-black" style={{ backgroundColor: shoes }} />
        </div>
        <div className="w-7 h-14 border-4 border-black flex flex-col justify-end" style={{ backgroundColor: pants }}>
          <div className="w-full h-4 border-t-2 border-black" style={{ backgroundColor: shoes }} />
        </div>
      </div>
    </motion.div>
  );
}
