 "use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Character from "@/components/Character";
import { sampleQuestions, Question } from "@/lib/sampleQuestions";

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

export default function Play() {
  const router = useRouter();

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

    const pool = sampleQuestions.filter(
      (q) => q.category === s.category && q.difficulty === s.difficulty
    );

    const expanded = shuffle([...pool, ...pool, ...pool, ...pool, ...pool]);
    setAQs(shuffle(expanded).slice(0, 25));
    setBQs(shuffle(expanded).slice(0, 25));
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
        setProjectile(team);
        setTimeout(() => setHit(team), 420);
      } else {
        setScore((prev) => ({ ...prev, [team]: prev[team] + 50 }));
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
        <div className="relative mb-3 h-[250px] overflow-hidden rounded-2xl border-4 border-slate-900/70 bg-gradient-to-b from-sky-300 to-green-600 shadow-inner md:h-[320px]">
          <div className="voxel-cloud left-[8%] top-8" />
          <div className="voxel-cloud right-[10%] top-12" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-[linear-gradient(#67a84a_0_30%,#8b5a2b_30%_100%)]" />

          <div className="absolute bottom-14 left-[12%] md:left-[20%]">
            <Character team="A" attacking={projectile === "A"} hit={hit === "A"} />
          </div>

          <div className="absolute bottom-14 right-[12%] md:right-[20%]">
            <Character team="B" attacking={projectile === "B"} hit={hit === "B"} />
          </div>

          <motion.div
            className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-xl border-4 border-black bg-yellow-400 px-5 py-2 text-3xl font-black text-slate-900 shadow-[5px_5px_0_#000]"
            animate={{ scale: [1, 1.08, 1], rotate: [-2, 2, -2] }}
            transition={{ repeat: Infinity, duration: 1.4 }}
          >
            VS
          </motion.div>

          <AnimatePresence>
            {projectile && (
              <motion.div
                key={`${projectile}-${round}-${firstCorrect}`}
                initial={{
                  opacity: 0,
                  x: projectile === "A" ? -80 : 80,
                  y: 15,
                  scale: 0.3,
                  rotate: 0,
                }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  x: projectile === "A" ? [-80, 0, 170] : [80, 0, -170],
                  y: [15, -35, 5],
                  scale: [0.3, 1, 1.2],
                  rotate: [0, 180, 360],
                }}
                transition={{ duration: 0.65 }}
                onAnimationComplete={() => setProjectile(null)}
                className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
              >
                <div className="h-10 w-10 rotate-45 border-4 border-black bg-cyan-300 shadow-[4px_4px_0_#0f4c5c]" />
                <div className="absolute -left-4 top-1/2 h-3 w-16 -translate-y-1/2 bg-white/80 blur-sm" />
              </motion.div>
            )}

            {hit && (
              <motion.div
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: [0, 1, 1, 0], scale: [0.4, 1.3, 1] }}
                className={`absolute top-1/2 z-30 text-3xl font-black text-yellow-300 ${
                  hit === "A" ? "right-[18%]" : "left-[18%]"
                }`}
              >
                💥 -100
              </motion.div>
            )}
          </AnimatePresence>

          {firstCorrect && (
            <div
              className={`absolute top-3 left-1/2 -translate-x-1/2 rounded-full border-2 border-black bg-white px-4 py-1 text-xs font-black ${
                firstCorrect === "A" ? "text-blue-700" : "text-red-700"
              }`}
            >
              ⚡ {firstCorrect === "A" ? setup.a : setup.b} DULUAN!
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
