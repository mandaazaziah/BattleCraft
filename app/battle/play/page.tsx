 "use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Character from "@/components/Character";
import { sampleQuestions, Question } from "@/lib/sampleQuestions";
import { useSoundSystem } from "@/lib/useSound";
import { supabase } from "@/lib/supabase";

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

type Team = "A" | "B";
type Feedback = "correct" | "wrong" | null;

type TeamState = {
  answered: boolean;
  feedback: Feedback;
  selected: number | null;
};

type QuestionRow = {
  id: number;
  category: Question["category"];
  difficulty: Question["difficulty"];
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: "A" | "B" | "C" | "D";
};

const toQuestion = (row: QuestionRow): Question => ({
  id: row.id,
  category: row.category,
  difficulty: row.difficulty,
  question: row.question,
  options: [row.option_a, row.option_b, row.option_c, row.option_d],
  correct: row.correct_answer.charCodeAt(0) - 65,
});

export default function Play() {
  const router = useRouter();
  const { play } = useSoundSystem();
  const battleStartedRef = useRef(false);

  const [setup, setSetup] = useState<any>(null);
  const [round, setRound] = useState(0);
  const [score, setScore] = useState({ A: 0, B: 0 });
  const [firstCorrect, setFirstCorrect] = useState<Team | null>(null);
  const [projectile, setProjectile] = useState<Team | null>(null);
  const [hit, setHit] = useState<Team | null>(null);
  const [aQs, setAQs] = useState<Question[]>([]);
  const [bQs, setBQs] = useState<Question[]>([]);
  const [teamState, setTeamState] = useState<Record<Team, TeamState>>({
    A: { answered: false, feedback: null, selected: null },
    B: { answered: false, feedback: null, selected: null },
  });

  useEffect(() => {
    const raw = sessionStorage.getItem("battleSetup");
    if (!raw) {
      router.replace("/");
      return;
    }

    const s = JSON.parse(raw);
    setSetup(s);

    // Ambil soal berdasarkan kategori (literasi / numerasi) dan acak 25 soal
    const pool = sampleQuestions.filter((q) => q.category === s.category);
    const shuffledPool = shuffle(pool);

    // Ambil 25 soal pertama (atau duplicate jika kurang dari 25)
    const questions25A = shuffledPool.slice(0, 25);
    const questions25B = shuffle([...shuffledPool]).slice(0, 25);

    setAQs(questions25A);
    setBQs(questions25B);

    // Battle start fanfare (hanya sekali)
    if (!battleStartedRef.current) {
      battleStartedRef.current = true;
      setTimeout(() => play("battle_start"), 500);
    }
  }, [router]);

  const qA = aQs[round];
  const qB = bQs[round];

  const bothAnswered = teamState.A.answered && teamState.B.answered;

  const resetRound = () => {
    setTeamState({
      A: { answered: false, feedback: null, selected: null },
      B: { answered: false, feedback: null, selected: null },
    });
    setFirstCorrect(null);
    setProjectile(null);
    setHit(null);
  };


  const answer = (team: Team, index: number) => {
    if (!setup) return;
    if (teamState[team].answered) return;

    const q = team === "A" ? qA : qB;
    if (!q) return;

    const correct = index === q.correct;

    play(correct ? "correct" : "wrong");

    setTeamState((prev) => ({
      ...prev,
      [team]: {
        answered: true,
        feedback: correct ? "correct" : "wrong",
        selected: index,
      },
    }));

    if (correct) {
      const isFirst = firstCorrect === null;

      if (isFirst) {
        setFirstCorrect(team);
        setScore((prev) => ({ ...prev, [team]: prev[team] + 100 }));
        play("score_up");
        setProjectile(team);
        play("attack");
        setTimeout(() => setHit(team), 420);
        setTimeout(() => play("hit"), 420);
      } else {
        setScore((prev) => ({ ...prev, [team]: prev[team] + 50 }));
        play("score_up");
      }
    }
  };

  useEffect(() => {
    if (!bothAnswered) return;

    const timer = setTimeout(() => {
      if (round >= 24) {
        sessionStorage.setItem(
          "battleFinalScore",
          JSON.stringify(score)
        );
        router.push("/battle/result");
      } else {
        play("round_next");
        setRound((r) => r + 1);
        resetRound();
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [bothAnswered, round, router, score]);

  const teamCard = (team: Team, q?: Question) => {
    const isBlue = team === "A";
    const state = teamState[team];
    const teamName = isBlue ? setup.a : setup.b;

    return (
      <section
        className={`relative overflow-hidden rounded-2xl border-[5px] ${
          isBlue ? "border-blue-700" : "border-red-700"
        } bg-white shadow-[0_8px_0_rgba(0,0,0,.3)]`}
      >
        <div
          className={`flex items-center justify-between px-5 py-3 ${
            isBlue ? "bg-blue-700" : "bg-red-700"
          } text-white`}
        >
          <div>
            <div className="pixel-text text-xs uppercase tracking-wider">
              {teamName}
            </div>
            <div className="mt-1 text-xs font-black opacity-90">
              SOAL {round + 1}/25
            </div>
          </div>

          <div className="text-2xl font-black">{score[team]}</div>
        </div>

        <div className="h-3 bg-slate-900/20">
          <motion.div
            className={isBlue ? "h-full bg-blue-500" : "h-full bg-red-500"}
            animate={{ width: `${Math.min(score[team] / 25, 100)}%` }}
          />
        </div>

        <div className="p-5 md:p-6">
          <div className="min-h-[92px] rounded-xl border-2 border-slate-200 bg-slate-50 p-4 text-base font-extrabold leading-relaxed text-slate-800 md:text-lg">
            {q?.question}
          </div>

          <div className="mt-4 grid gap-2.5">
            {q?.options.map((option, index) => {
              const selected = state.selected === index;
              const correct = index === q.correct;

              let style =
                "border-slate-300 bg-white hover:-translate-y-0.5 hover:bg-slate-100";

              if (state.answered) {
                if (selected && state.feedback === "wrong")
                  style = "border-red-500 bg-red-100 text-red-800";
                else if (correct && state.feedback === "correct")
                  style = "border-green-500 bg-green-100 text-green-800";
                else
                  style = "border-slate-200 bg-slate-100 opacity-60";
              }

              return (
                <button
                  key={index}
                  disabled={state.answered}
                  onClick={() => answer(team, index)}
                  className={`flex items-center gap-3 rounded-xl border-2 p-3 text-left font-extrabold text-slate-800 transition ${style}`}
                >
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg text-sm text-white ${
                      isBlue ? "bg-blue-600" : "bg-red-600"
                    }`}
                  >
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span>{option}</span>
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {!state.answered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`mt-3 text-center text-xs font-black ${
                  isBlue ? "text-blue-700" : "text-red-700"
                }`}
              >
                ⚡ CEPAT! PILIH JAWABANMU
              </motion.div>
            )}

            {state.feedback && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-3 text-center font-black ${
                  state.feedback === "correct"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {state.feedback === "correct"
                  ? firstCorrect === team
                    ? "⚔️ BENAR! +100 — KAMU DULUAN!"
                    : "✓ BENAR! +50"
                  : "✕ SALAH!"}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    );
  };

  if (!setup || !qA || !qB) {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-900 text-white">
        Menyiapkan battle...
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-gradient-to-b from-sky-400 via-sky-300 to-green-700 p-3 md:p-5">
      <div className="mx-auto max-w-[1450px]">
        {/* TOP SCORE */}
        <div className="mb-2 grid grid-cols-2 gap-2 md:gap-4">
          <div className="rounded-xl border-4 border-blue-900 bg-blue-700 px-3 py-2 text-white shadow-[0_5px_0_rgba(0,0,0,.35)]">
            <div className="flex items-center justify-between">
              <div>
                <div className="pixel-text text-xs">{setup.a}</div>
                <div className="text-[10px] font-black">SOAL {round + 1}/25</div>
              </div>
              <b className="text-xl">⭐ {score.A}</b>
            </div>
          </div>

          <div className="rounded-xl border-4 border-red-900 bg-red-700 px-3 py-2 text-white shadow-[0_5px_0_rgba(0,0,0,.35)]">
            <div className="flex items-center justify-between">
              <b className="text-xl">⭐ {score.B}</b>
              <div className="text-right">
                <div className="pixel-text text-xs">{setup.b}</div>
                <div className="text-[10px] font-black">SOAL {round + 1}/25</div>
              </div>
            </div>
          </div>
        </div>

        {/* ARENA */}
        <div className="relative mb-3 h-[250px] overflow-hidden rounded-2xl border-4 border-slate-900/70 bg-gradient-to-b from-sky-400 via-sky-300 to-green-600 shadow-inner md:h-[320px]">
          <div className="voxel-cloud left-[8%] top-8" />
          <div className="voxel-cloud right-[10%] top-12" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-[linear-gradient(#5fa33e_0_30%,#7a4d25_30%_100%)] border-t-4 border-[#3e7025]" />

          {/* Karakter Team A (Kiri) */}
          <div className="absolute bottom-10 left-[10%] md:left-[18%] z-10">
            <Character team="A" attacking={projectile === "A"} hit={hit === "A"} />
          </div>

          {/* Karakter Team B (Kanan) */}
          <div className="absolute bottom-10 right-[10%] md:right-[18%] z-10">
            <Character team="B" attacking={projectile === "B"} hit={hit === "B"} />
          </div>

          {/* TEKS VS DI TENGAH-TENGAH PERSIS */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <motion.div
              className="rounded-xl border-4 border-black bg-yellow-400 px-6 py-2.5 text-3xl md:text-4xl font-black text-slate-950 shadow-[5px_5px_0_#000]"
              animate={{ scale: [1, 1.1, 1], rotate: [-2, 2, -2] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              VS
            </motion.div>
          </div>

          {/* Animasi Lempar Menyerang: Sesuai Senjata Karakter (Trisula untuk Team A, Panah untuk Team B) */}
          <AnimatePresence>
            {projectile && (
              <motion.div
                key={`${projectile}-${round}-${firstCorrect}`}
                initial={{
                  opacity: 0,
                  x: projectile === "A" ? -140 : 140,
                  y: -15,
                  scale: 0.7,
                  rotate: projectile === "A" ? 45 : 0,
                }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  x: projectile === "A" ? [-140, 0, 240] : [140, 0, -240],
                  y: [-15, -45, 10],
                  scale: [0.7, 1.2, 1],
                  rotate: projectile === "A" ? [45, 405, 765] : [0, 0, 0],
                }}
                transition={{ duration: 0.65, ease: "easeOut" }}
                onAnimationComplete={() => setProjectile(null)}
                className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              >
                {projectile === "A" ? (
                  /* Output Serangan Team A: Trisula Terbang Berputar (Flying Trident) */
                  <div className="relative flex items-center justify-center">
                    <div className="relative w-14 h-14 select-none filter drop-shadow-[0_0_12px_#2dd4bf]">
                      {/* 3 Mata Trisula */}
                      <div className="absolute top-0 left-1 w-2.5 h-6 bg-[#2dd4bf] border-2 border-[#0f766e] shadow-[inset_1px_1px_0px_#ffffff]" />
                      <div className="absolute top-[-4px] left-4 w-2.5 h-8 bg-[#5eead4] border-2 border-[#0f766e] shadow-[inset_1px_1px_0px_#ffffff]" />
                      <div className="absolute top-0 left-7 w-2.5 h-6 bg-[#2dd4bf] border-2 border-[#0f766e] shadow-[inset_1px_1px_0px_#ffffff]" />
                      <div className="absolute top-5 left-1 w-9 h-2.5 bg-[#0f766e] border border-black" />
                      <div className="absolute top-7 left-4 w-2.5 h-9 bg-[#115e59] border border-black" />
                    </div>
                    {/* Jejak Partikel Air/Buih Prismarine */}
                    <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-20 h-4 bg-gradient-to-r from-transparent via-[#2dd4bf]/70 to-[#5eead4] rounded-full blur-[2px]" />
                  </div>
                ) : (
                  /* Output Serangan Team B: Anak Panah Meluncur Lurus Cepat (Flying Tipped Arrow) */
                  <div className="relative flex items-center justify-center">
                    <div className="relative w-14 h-3.5 bg-[#8b5a2b] border border-black flex items-center shadow-[0_0_12px_#f97316]">
                      {/* Mata Panah Flint Tajam Menghadap Kiri */}
                      <div className="absolute -left-3 w-4 h-5 bg-[#4b5563] border border-black transform rotate-45 shadow-sm" />
                      {/* Poros Kayu */}
                      <div className="w-full h-1 bg-[#d97706]" />
                      {/* Bulu Panah Putih (Feather Fletching) di Kanan */}
                      <div className="absolute -right-2.5 w-3 h-5 bg-white border border-black" />
                    </div>
                    {/* Jejak Partikel Panah Melesat */}
                    <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-20 h-3 bg-gradient-to-l from-transparent via-orange-500/80 to-amber-300 rounded-full blur-[1px]" />
                  </div>
                )}
              </motion.div>
            )}

            {/* Efek Kena Serangan (Hit Splash Minecraft Heart Damage & Particle) */}
            {hit && (
              <motion.div
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: [0, 1, 1, 0], scale: [0.4, 1.4, 1.1] }}
                transition={{ duration: 0.5 }}
                className={`absolute top-1/3 z-40 flex items-center gap-1 font-black text-yellow-300 drop-shadow-[3px_3px_0_#000] ${
                  hit === "A" ? "right-[15%] md:right-[22%]" : "left-[15%] md:left-[22%]"
                }`}
              >
                <span className="text-3xl">💔</span>
                <span className="text-3xl text-red-500 font-pixel drop-shadow-[2px_2px_0_#000]">-100</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Notifikasi Siapa Cepat Duluan */}
          {firstCorrect && (
            <div
              className={`absolute top-3 left-1/2 -translate-x-1/2 rounded-full border-2 border-black bg-white/95 px-5 py-1 text-xs md:text-sm font-black shadow-md z-30 ${
                firstCorrect === "A" ? "text-blue-700" : "text-red-700"
              }`}
            >
              ⚡ {firstCorrect === "A" ? setup.a : setup.b} MENYERANG LEBIH CEPAT! (+100)
            </div>
          )}
        </div>

        {/* QUESTIONS */}
        <div className="grid gap-3 md:grid-cols-2 md:gap-5">
          {teamCard("A", qA)}
          {teamCard("B", qB)}
        </div>

        <div className="mt-3 flex items-center justify-between rounded-xl border-4 border-slate-900 bg-slate-950 px-4 py-2 text-white shadow-[0_5px_0_rgba(0,0,0,.35)]">
          <span className="text-xs font-black">⚡ SIAPA CEPAT DIA DAPAT</span>
          <span className="pixel-text text-xs">ROUND {round + 1} / 25</span>
          <button
            onClick={() => router.push("/")}
            className="rounded-lg bg-slate-700 px-3 py-1 text-xs font-black hover:bg-slate-600"
          >
            KELUAR
          </button>
        </div>
      </div>
    </main>
  );
}
