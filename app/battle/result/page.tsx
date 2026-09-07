 "use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import PixelButton from "@/components/PixelButton";

const PENALTIES = [
  "🎤 Nyanyi 1 Lagu Anak-Anak / Pop",
  "💃 Joget Gaya Karakter Minecraft 15 Detik",
  "🐔 Tirukan Suara Hewan Peliharaan",
  "👏 Berikan Tepuk Tangan Hebat untuk Tim Pemenang",
  "🏃 Lari di Tempat Sambil Teriak 'BattleCraft!' 10x",
  "🗿 Pose Menjadi Patung Batu Selama 20 Detik",
  "📖 Bacakan Pantun Lucu Buatan Sendiri",
  "🦖 Tirukan Gaya Dinosaurus / Creeper Berjalan",
];

export default function Result() {
  const router = useRouter();
  const [setup, setSetup] = useState<any>(null);
  const [score, setScore] = useState<{ A: number; B: number }>({ A: 0, B: 0 });

  useEffect(() => {
    const rawSetup = sessionStorage.getItem("battleSetup");
    const rawScore = sessionStorage.getItem("battleFinalScore");

    if (!rawSetup) {
      router.replace("/");
      return;
    }

    setSetup(JSON.parse(rawSetup));
    if (rawScore) {
      setScore(JSON.parse(rawScore));
    }
  }, [router]);

  if (!setup) return null;

  const isDraw = score.A === score.B;
  const winnerTeam = isDraw ? null : score.A > score.B ? "A" : "B";
  const winnerName = winnerTeam === "A" ? setup.a : setup.b;

  return (
    <main className="sky relative min-h-screen p-4 md:p-8 flex items-center justify-center overflow-y-auto">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/55 pointer-events-none" />

      <div className="relative z-10 w-full max-w-3xl card-glass pixel-border rounded-2xl p-6 md:p-10 shadow-2xl backdrop-blur-md text-white my-6">
        
        {/* HEADER RESULT */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.6 }}
            className="text-6xl md:text-7xl mb-2"
          >
            🏆
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
              {winnerTeam === "A" && <div className="text-xs font-pixel text-yellow-300 mb-1 animate-pulse">👑 CHAMPION 👑</div>}
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
              {winnerTeam === "B" && <div className="text-xs font-pixel text-yellow-300 mb-1 animate-pulse">👑 CHAMPION 👑</div>}
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
            <p className="text-xl font-bold text-yellow-300">🤝 PERTANDINGAN SERI! KEDUA TIM SAMA-SAMA HEBAT!</p>
          ) : (
            <p className="text-xl md:text-2xl font-bold leading-relaxed">
              🎉 SELAMAT KEPADA <span className="text-yellow-300 underline font-black">{winnerName}</span> TELAH MEMENANGKAN BATTLE! 🎉
            </p>
          )}
        </div>

        {/* TOMBOL BERIKUTNYA KE HALAMAN RODA HUKUMAN */}
        <div className="text-center pt-2">
          <PixelButton
            href="/battle/penalty"
            className="bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black px-10 py-4 text-xl shadow-[0_4px_20px_rgba(234,179,8,0.6)] animate-pulse inline-block"
          >
            ➡️ BERIKUTNYA (RODA HUKUMAN)
          </PixelButton>
        </div>
      </div>
    </main>
  );
}