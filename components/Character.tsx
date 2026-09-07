 "use client";

import { motion } from "framer-motion";

type Props = {
  team: "A" | "B";
  attacking?: boolean;
  hit?: boolean;
};

export default function Character({ team, attacking = false, hit = false }: Props) {
  const blue = team === "A";
  const skin = blue ? "#e6b98a" : "#d79b70";
  const shirt = blue ? "#1976d2" : "#c62828";
  const dark = "#17202a";
  const hair = "#3b2418";

  return (
    <motion.div
      className="relative h-40 w-32 select-none"
      animate={
        hit
          ? { x: [0, blue ? 10 : -10, blue ? -8 : 8, 0], rotate: [0, blue ? 7 : -7, blue ? -5 : 5, 0] }
          : attacking
          ? { x: [0, blue ? 22 : -22, blue ? 45 : -45, blue ? 20 : -20, 0], y: [0, -4, -10, -3, 0] }
          : { y: [0, -3, 0] }
      }
      transition={{ duration: attacking || hit ? 0.65 : 2, repeat: attacking || hit ? 0 : Infinity }}
    >
      {/* shadow */}
      <div className="absolute bottom-0 left-4 h-3 w-24 rounded-full bg-black/35 blur-sm" />

      {/* legs */}
      <div className="absolute bottom-3 left-7 h-16 w-9 border-4 border-black bg-[#303b4a]" />
      <div className="absolute bottom-3 right-7 h-16 w-9 border-4 border-black bg-[#303b4a]" />
      <div className="absolute bottom-0 left-5 h-5 w-12 border-4 border-black bg-[#151b24]" />
      <div className="absolute bottom-0 right-5 h-5 w-12 border-4 border-black bg-[#151b24]" />

      {/* body */}
      <div className="absolute left-4 top-[72px] h-20 w-24 border-4 border-black" style={{ backgroundColor: shirt }}>
        <div className="absolute left-1/2 top-0 h-14 w-1 -translate-x-1/2 bg-white/25" />
        <div className="absolute left-1/2 top-4 h-2 w-8 -translate-x-1/2 bg-white/80" />
      </div>

      {/* arms */}
      <motion.div
        className="absolute left-0 top-[76px] h-12 w-7 border-4 border-black"
        style={{ backgroundColor: shirt }}
        animate={attacking && blue ? { rotate: [-5, -55, -15] } : undefined}
        transition={{ duration: 0.5 }}
      />
      <motion.div
        className="absolute right-0 top-[76px] h-12 w-7 border-4 border-black"
        style={{ backgroundColor: shirt }}
        animate={attacking && !blue ? { rotate: [5, 55, 15] } : undefined}
        transition={{ duration: 0.5 }}
      />

      {/* head */}
      <div className="absolute left-7 top-3 h-16 w-18 border-4 border-black" style={{ width: 72, backgroundColor: skin }}>
        {/* hair */}
        <div className="absolute -left-1 -top-1 h-8 w-[72px] border-4 border-black" style={{ backgroundColor: hair }} />
        <div className="absolute left-2 top-6 h-3 w-3 bg-black" />
        <div className="absolute right-2 top-6 h-3 w-3 bg-black" />
        <div className="absolute left-5 top-12 h-2 w-8 bg-black/60" />
        <div className="absolute -left-4 top-7 h-8 w-4 border-4 border-black" style={{ backgroundColor: skin }} />
        <div className="absolute -right-4 top-7 h-8 w-4 border-4 border-black" style={{ backgroundColor: skin }} />
      </div>

      {/* cap / headband */}
      <div className="absolute left-5 top-0 h-5 w-24 border-4 border-black" style={{ backgroundColor: blue ? "#0d47a1" : "#8e1720" }} />
      <div className="absolute left-3 top-4 h-4 w-8 border-4 border-black" style={{ backgroundColor: blue ? "#0d47a1" : "#8e1720" }} />
    </motion.div>
  );
}
