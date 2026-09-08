 "use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import PixelButton from "@/components/PixelButton";
import VoxelIcon from "@/components/VoxelIcon";
import { useSoundSystem } from "@/lib/useSound";
import { loadBattleSetup } from "@/lib/battle";
import { supabase } from "@/lib/supabase";

const CONFETTI = [
  { emoji: "🎉", x: -270, y: 270, rotate: -220, delay: 0 },
  { emoji: "✨", x: -210, y: 330, rotate: -150, delay: 0.06 },
  { emoji: "🎊", x: -155, y: 235, rotate: -110, delay: 0.12 },
  { emoji: "✨", x: -95, y: 365, rotate: -80, delay: 0.18 },
  { emoji: "🎉", x: -40, y: 290, rotate: -40, delay: 0.04 },
  { emoji: "🎊", x: 40, y: 290, rotate: 40, delay: 0.04 },
  { emoji: "✨", x: 95, y: 365, rotate: 80, delay: 0.18 },
  { emoji: "🎉", x: 155, y: 235, rotate: 110, delay: 0.12 },
  { emoji: "✨", x: 210, y: 330, rotate: 150, delay: 0.06 },
  { emoji: "🎊", x: 270, y: 270, rotate: 220, delay: 0 },
];

function ResultContent() {
  const router = useRouter();
  const params = useSearchParams();
  const { play } = useSoundSystem();
  const resultSoundPlayedRef = useRef(false);
  const [setup, setSetup] = useState<any>(null);
  const [score, setScore] = useState<{ A: number; B: number }>({ A: 0, B: 0 });

  useEffect(() => {
    const battleId = params.get("battle");
    const client = supabase;
    if (!battleId || !client) {
      router.replace("/");
      return;
    }
    const load = async () => {
      const [battleSetup, result] = await Promise.all([
        loadBattleSetup(battleId),
        client.from("battles").select("team_a_score,team_b_score").eq("id", battleId).single(),
      ]);
      if (!battleSetup || result.error || !result.data) {
        router.replace("/");
        return;
      }
      setSetup(battleSetup);
      const finalScore = { A: result.data.team_a_score, B: result.data.team_b_score };
      setScore(finalScore);
      if (!resultSoundPlayedRef.current) {
        resultSoundPlayedRef.current = true;
        play(finalScore.A === finalScore.B ? "draw" : finalScore.A > finalScore.B ? "win" : "lose");
      }
    };
    load();
  }, [params, play, router]);

  if (!setup) return null;

  const isDraw = score.A === score.B;
  const winnerTeam = isDraw ? null : score.A > score.B ? "A" : "B";
  const winnerName = winnerTeam === "A" ? setup.a : setup.b;

  return (
    <main className="sky relative min-h-screen p-4 md:p-8 flex items-center justify-center overflow-y-auto">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/55 pointer-events-none" />

      <div className="relative z-10 w-full max-w-3xl card-glass pixel-border rounded-2xl p-6 md:p-10 shadow-2xl backdrop-blur-md text-white my-6 overflow-hidden">
        {winnerTeam && (
          <AnimatePresence>
            <div className="pointer-events-none absolute left-1/2 top-5 z-20 h-0 w-0" aria-hidden="true">
              {CONFETTI.map((particle, index) => (
                <motion.span
                  key={`${particle.emoji}-${index}`}
                  initial={{ opacity: 0, x: 0, y: 0, scale: 0.35, rotate: 0 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    x: particle.x,
                    y: particle.y,
                    scale: [0.35, 1.15, 0.9],
                    rotate: particle.rotate,
                  }}
                  transition={{
                    duration: 1.15 + (index % 3) * 0.1,
                    delay: particle.delay,
                    ease: [0.2, 0.8, 0.35, 1],
                  }}
                  className="absolute text-2xl drop-shadow-[3px_3px_0_#172033] md:text-3xl"
                >
                  {particle.emoji}
                </motion.span>
              ))}
            </div>
          </AnimatePresence>
        )}
        
        {/* HEADER RESULT */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.6 }}
            className="mb-2 flex justify-center drop-shadow-[4px_4px_0_#000]"
          >
            <VoxelIcon name="trophy" size={78} className="h-16 w-16 md:h-20 md:w-20" />
          </motion.div>
          <div className="pixel-text text-sm md:text-base text-yellow-300 drop-shadow-[2px_2px_0_#000]">
            BATTLE COMPLETED (25 SOAL)
          </div>
          <h1 className="pixel-text text-2xl md:text-4xl text-white mt-2 drop-shadow-[3px_3px_0_#000]">
            HASIL PERTANDINGAN
          </h1>
        </div>

        {/* PODIUM PEMENANG & PEROLEHAN SKOR */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {/* KARTU TIM A */}
          <div className={`rounded-xl border-4 p-5 text-center flex flex-col justify-between ${
            winnerTeam === "A"
              ? "bg-gradient-to-b from-blue-700 to-blue-950 border-yellow-400 shadow-[0_0_20px_rgba(234,179,8,0.5)]"
              : "bg-slate-900/80 border-blue-900"
          }`}>
            <div>
              {winnerTeam === "A" && <div className="mb-1 flex items-center justify-center gap-2 text-xs font-pixel text-yellow-300 animate-pulse"><VoxelIcon name="trophy" size={22} /> CHAMPION</div>}
              <div className="text-xl md:text-2xl font-black text-blue-300 uppercase">{setup.a}</div>
              {setup.membersA?.length > 0 && (
                <div className="text-xs text-blue-200 mt-1 opacity-80">
                  Anggota: {setup.membersA.join(", ")}
                </div>
              )}
            </div>
            <div className="mt-4">
              <div className="text-xs font-bold text-slate-400 uppercase">Total Skor</div>
              <div className="text-4xl md:text-5xl font-black text-white drop-shadow-[2px_2px_0_#000]">
                {score.A} <span className="text-lg text-yellow-300">PTS</span>
              </div>
            </div>
          </div>

          {/* KARTU TIM B */}
          <div className={`rounded-xl border-4 p-5 text-center flex flex-col justify-between ${
            winnerTeam === "B"
              ? "bg-gradient-to-b from-red-700 to-red-950 border-yellow-400 shadow-[0_0_20px_rgba(234,179,8,0.5)]"
              : "bg-slate-900/80 border-red-900"
          }`}>
            <div>
              {winnerTeam === "B" && <div className="mb-1 flex items-center justify-center gap-2 text-xs font-pixel text-yellow-300 animate-pulse"><VoxelIcon name="trophy" size={22} /> CHAMPION</div>}
              <div className="text-xl md:text-2xl font-black text-red-300 uppercase">{setup.b}</div>
              {setup.membersB?.length > 0 && (
                <div className="text-xs text-red-200 mt-1 opacity-80">
                  Anggota: {setup.membersB.join(", ")}
                </div>
              )}
            </div>
            <div className="mt-4">
              <div className="text-xs font-bold text-slate-400 uppercase">Total Skor</div>
              <div className="text-4xl md:text-5xl font-black text-white drop-shadow-[2px_2px_0_#000]">
                {score.B} <span className="text-lg text-yellow-300">PTS</span>
              </div>
            </div>
          </div>
        </div>

        {/* STATUS JUARA / UCAPAN SELAMAT */}
        <div className="p-4 rounded-xl border-2 border-slate-700 bg-slate-950/80 text-center mb-6 shadow-md">
          {isDraw ? (
            <p className="flex items-center justify-center gap-3 text-xl font-bold text-yellow-300"><VoxelIcon name="tie" size={34} /> PERTANDINGAN SERI! KEDUA TIM SAMA-SAMA HEBAT!</p>
          ) : (
            <p className="text-xl md:text-2xl font-bold leading-relaxed">
              <VoxelIcon name="trophy" size={30} className="mr-2 inline-block align-middle" /> SELAMAT KEPADA <span className="text-yellow-300 underline font-black">{winnerName}</span> TELAH MEMENANGKAN BATTLE!
            </p>
          )}
        </div>

        {/* TOMBOL BERIKUTNYA KE HALAMAN RODA HUKUMAN */}
        <div className="text-center pt-2">
          <PixelButton
            href={`/battle/penalty?battle=${encodeURIComponent(setup.id)}`}
            className="bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black px-10 py-4 text-xl shadow-[0_4px_20px_rgba(234,179,8,0.6)] animate-pulse inline-block"
          >
            ➡️ BERIKUTNYA (RODA HUKUMAN)
          </PixelButton>
        </div>
      </div>
    </main>
  );
}

export default function Result() {
  return (
    <Suspense fallback={<main className="grid min-h-screen place-items-center bg-slate-900 text-white">Memuat hasil...</main>}>
      <ResultContent />
    </Suspense>
  );
}