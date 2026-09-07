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

export default function PenaltyPage() {
  const router = useRouter();
  const [setup, setSetup] = useState<any>(null);
  const [score, setScore] = useState<{ A: number; B: number }>({ A: 0, B: 0 });
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedPenalty, setSelectedPenalty] = useState<string | null>(null);
  const [wheelRotation, setWheelRotation] = useState(0);

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
  const loserTeam = isDraw ? null : score.A > score.B ? "B" : "A";
  const loserName = loserTeam === "A" ? setup.a : setup.b;
  const loserMembers = loserTeam === "A" ? setup.membersA : setup.membersB;

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSelectedPenalty(null);

    const randomIndex = Math.floor(Math.random() * PENALTIES.length);
    const extraSpins = 5 * 360; // 5 putaran penuh
    const sliceAngle = 360 / PENALTIES.length;
    const targetAngle = extraSpins + randomIndex * sliceAngle + sliceAngle / 2;

    setWheelRotation((prev) => prev + targetAngle);

    setTimeout(() => {
      setIsSpinning(false);
      setSelectedPenalty(PENALTIES[randomIndex]);
    }, 3500);
  };

  return (
    <main className="sky relative min-h-screen p-4 md:p-8 flex items-center justify-center overflow-y-auto">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />

      <div className="relative z-10 w-full max-w-3xl card-glass pixel-border rounded-2xl p-6 md:p-10 shadow-2xl backdrop-blur-md text-white my-6 text-center">
        
        {/* HEADER */}
        <div className="mb-4">
          <div className="text-5xl mb-2 animate-bounce">🎡</div>
          <div className="pixel-text text-sm text-red-400 drop-shadow-[2px_2px_0_#000]">
            RODA HUKUMAN
          </div>
          <h1 className="pixel-text text-2xl md:text-3xl text-white mt-2 drop-shadow-[3px_3px_0_#000]">
            PENALTY WHEEL SPINNER
          </h1>
        </div>

        {isDraw ? (
          <div className="p-6 bg-slate-900/80 border-2 border-slate-700 rounded-xl mb-6">
            <p className="text-xl font-bold text-yellow-300">
              Pertandingan berakhir SERI! Tidak ada tim yang mendapatkan hukuman.
            </p>
          </div>
        ) : (
          <div className="border-4 border-amber-600 bg-gradient-to-b from-amber-950/70 to-slate-950 p-6 rounded-2xl mb-8 shadow-xl flex flex-col items-center">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
              Hukuman untuk Tim yang Kalah: <span className="text-red-400 underline font-black uppercase">{loserName}</span>
            </h2>
            <p className="text-xs md:text-sm text-amber-200/90 mb-6 max-w-lg">
              {loserMembers?.length > 0
                ? `Anggota (${loserMembers.join(", ")}) harus menjalankan hukuman hasil spin di bawah ini!`
                : "Tim yang kalah harus menjalankan hukuman hasil spin di bawah ini!"}
            </p>

            {/* Roda Putar Interaktif dengan Ikon Peti Kejutan / Mystery Chest */}
            <div className="relative w-72 h-72 md:w-80 md:h-80 mb-6 flex items-center justify-center select-none">
              {/* Penunjuk Jarum Atas */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-40 text-4xl filter drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                🔻
              </div>

              {/* Piringan Roda Berisi Ikon Minecraft di Setiap Segmen */}
              <motion.div
                className="w-full h-full rounded-full border-8 border-yellow-400 shadow-[0_0_35px_rgba(245,158,11,0.7)] relative overflow-hidden bg-slate-900"
                style={{
                  background: "conic-gradient(#ef4444 0deg 45deg, #f97316 45deg 90deg, #eab308 90deg 135deg, #22c55e 135deg 180deg, #06b6d4 180deg 225deg, #3b82f6 225deg 270deg, #a855f7 270deg 315deg, #ec4899 315deg 360deg)",
                }}
                animate={{ rotate: wheelRotation }}
                transition={{ duration: 3.5, ease: [0.15, 0.9, 0.2, 1] }}
              >
                {/* 8 Ikon Khas Minecraft di SEMUA 8 Segmen Roda (Tanpa Lingkaran Pinggir, Hanya Ikon + Sedikit Shadow) */}
                {[
                  { angle: 22.5, icon: "🧰", label: "Peti" },
                  { angle: 67.5, icon: "🧨", label: "TNT" },
                  { angle: 112.5, icon: "📦", label: "Tong" },
                  { angle: 157.5, icon: "❓", label: "Misteri" },
                  { angle: 202.5, icon: "🎁", label: "Kado" },
                  { angle: 247.5, icon: "💎", label: "Berlian" },
                  { angle: 292.5, icon: "🎒", label: "Tas" },
                  { angle: 337.5, icon: "🧪", label: "Ramuan" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="absolute inset-0 pointer-events-none flex justify-center items-start pt-5"
                    style={{ transform: `rotate(${item.angle}deg)` }}
                  >
                    <span
                      className="text-2xl md:text-3xl filter drop-shadow-[2px_2px_2px_rgba(0,0,0,0.8)] select-none"
                      style={{ transform: `rotate(-${item.angle}deg)` }}
                    >
                      {item.icon}
                    </span>
                  </div>
                ))}

                {/* Logo Pusat Roda */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                  <div className="w-14 h-14 rounded-full bg-slate-950 border-4 border-yellow-400 flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(0,0,0,0.9)]">
                    ⚔️
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Tombol Spin */}
            <button
              onClick={spinWheel}
              disabled={isSpinning}
              className={`pixel-button px-8 py-3.5 text-lg font-black uppercase rounded-lg shadow-xl transition-all ${
                isSpinning
                  ? "bg-slate-600 text-slate-400 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-400 text-white shadow-[0_4px_15px_rgba(239,68,68,0.6)] cursor-pointer"
              }`}
            >
              {isSpinning ? "🌀 MEMBUKA PETI MISTERI..." : "🎰 BUKA PETI HUKUMAN!"}
            </button>

            {/* Hasil Hukuman yang Terpilih */}
            <AnimatePresence>
              {selectedPenalty && (
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="mt-6 p-5 bg-red-950/95 border-4 border-yellow-400 rounded-xl max-w-lg w-full shadow-2xl"
                >
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <span className="text-2xl">🎁</span>
                    <span className="text-xs font-pixel text-yellow-300">KEJUTAN HUKUMAN TERBUKA:</span>
                    <span className="text-2xl">📦</span>
                  </div>
                  <div className="text-xl md:text-2xl font-black text-white leading-relaxed">
                    {selectedPenalty}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* TOMBOL NAVIGASI BAWAH */}
        <div className="flex gap-4 justify-center flex-wrap pt-2">
          <PixelButton href="/battle/result" className="bg-slate-200 hover:bg-slate-300 text-slate-950 font-bold px-5 py-2.5 text-sm">
            ⬅️ KEMBALI KE HASIL SKOR
          </PixelButton>
          <PixelButton href="/" className="bg-slate-200 hover:bg-slate-300 text-slate-950 font-bold px-5 py-2.5 text-sm">
            🏠 KEMBALI KE BERANDA
          </PixelButton>
          <PixelButton
            href={`/battle/setup?category=${setup.category || "literasi"}`}
            className="bg-yellow-400 text-slate-950 font-bold px-5 py-2.5 text-sm shadow-[0_4px_15px_rgba(234,179,8,0.6)]"
          >
            🔄 MAIN LAGI (REMATCH)
          </PixelButton>
        </div>
      </div>
    </main>
  );
}