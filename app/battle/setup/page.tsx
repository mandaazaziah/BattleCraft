 "use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react";
import PixelButton from "@/components/PixelButton";

function SetupContent() {
  const params = useSearchParams();
  const router = useRouter();
  const category = params.get("category") === "numerasi" ? "numerasi" : "literasi";

  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [membersAStr, setMembersAStr] = useState("");
  const [membersBStr, setMembersBStr] = useState("");
  const [error, setError] = useState("");

  // Validasi: Nama Tim A dan Tim B wajib diisi (anggota bersifat opsional)
  const isFormValid = a.trim() !== "" && b.trim() !== "";

  const start = () => {
    if (!a.trim() || !b.trim()) {
      setError("Nama Tim A dan Tim B wajib diisi!");
      return;
    }

    setError("");
    // Parse anggota tim dari string berpemisah koma (opsional)
    const membersA = membersAStr
      ? membersAStr.split(",").map((m) => m.trim()).filter(Boolean)
      : [];
    const membersB = membersBStr
      ? membersBStr.split(",").map((m) => m.trim()).filter(Boolean)
      : [];

    const payload = { category, difficulty: "medium", a: a.trim(), b: b.trim(), membersA, membersB };
    sessionStorage.setItem("battleSetup", JSON.stringify(payload));
    router.push("/battle/play");
  };

  return (
    <main className="sky relative min-h-screen p-6 md:p-10 flex items-center justify-center">
      {/* Overlay gradien halus agar kontras dan terbaca jelas */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-3xl w-full card-glass pixel-border rounded-xl p-6 md:p-10 shadow-2xl backdrop-blur-md">
        <div className="mb-6 flex items-center justify-between border-b-2 border-slate-700/60 pb-4">
          <div>
            <div className="pixel-text text-xs text-yellow-300 drop-shadow-[1px_1px_0_#000]">⚔️ BATTLE SETUP</div>
            <h1 className="mt-2 text-3xl md:text-4xl font-bold text-white drop-shadow-[2px_2px_0_#000]">
              {category === "literasi" ? "📖 Kategori: Literasi" : "🔢 Kategori: Numerasi"}
            </h1>
          </div>
          <PixelButton href="/" className="bg-slate-100 text-sm">Home</PixelButton>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-600/90 border-2 border-red-300 rounded text-white font-bold text-center text-sm drop-shadow animate-pulse">
            ⚠️ {error}
          </div>
        )}

        <section className="space-y-6">
          {/* Form Nama Tim (Wajib) */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-950/50 p-4 rounded-lg border-2 border-blue-500 shadow-md">
              <label className="font-bold text-blue-200 flex items-center gap-2 text-base">
                <span className="flex items-center justify-center w-7 h-7 rounded bg-blue-600 text-white shadow-sm text-sm border border-blue-300">
                  🛡️
                </span>
                <span>Nama Team A</span>
                <span className="text-red-400 font-black text-sm">* (Wajib)</span>
              </label>
              <input
                className="pixel-input mt-2.5"
                value={a}
                onChange={(e) => { setA(e.target.value); setError(""); }}
                placeholder="Contoh: Tim Rajawali"
                required
              />
            </div>
            <div className="bg-red-950/50 p-4 rounded-lg border-2 border-red-500 shadow-md">
              <label className="font-bold text-red-200 flex items-center gap-2 text-base">
                <span className="flex items-center justify-center w-7 h-7 rounded bg-red-600 text-white shadow-sm text-sm border border-red-300">
                  ⚔️
                </span>
                <span>Nama Team B</span>
                <span className="text-red-400 font-black text-sm">* (Wajib)</span>
              </label>
              <input
                className="pixel-input mt-2.5"
                value={b}
                onChange={(e) => { setB(e.target.value); setError(""); }}
                placeholder="Contoh: Tim Garuda"
                required
              />
            </div>
          </div>

          {/* Form Anggota Tim (Opsional, 1 Kotak Input Berpemisah Koma) */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-950/50 p-4 rounded-lg border-2 border-blue-500 shadow-md">
              <label className="font-bold text-blue-200 flex items-center justify-between text-base">
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-7 h-7 rounded bg-cyan-600 text-white shadow-sm text-sm border border-cyan-300">
                    👥
                  </span>
                  <span>Anggota Team A</span>
                </div>
                <span className="text-xs text-blue-300 font-normal opacity-90">(Opsional)</span>
              </label>
              <input
                className="pixel-input mt-2.5"
                value={membersAStr}
                onChange={(e) => setMembersAStr(e.target.value)}
                placeholder="Pisahkan dengan koma (contoh: Budi, Siti, Andi)"
              />
              <p className="mt-1.5 text-[12px] text-blue-300/90 font-medium">Tulis nama anggota dipisah tanda koma (,)</p>
            </div>

            <div className="bg-red-950/50 p-4 rounded-lg border-2 border-red-500 shadow-md">
              <label className="font-bold text-red-200 flex items-center justify-between text-base">
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-7 h-7 rounded bg-amber-600 text-white shadow-sm text-sm border border-amber-300">
                    👥
                  </span>
                  <span>Anggota Team B</span>
                </div>
                <span className="text-xs text-red-300 font-normal opacity-90">(Opsional)</span>
              </label>
              <input
                className="pixel-input mt-2.5"
                value={membersBStr}
                onChange={(e) => setMembersBStr(e.target.value)}
                placeholder="Pisahkan dengan koma (contoh: Doni, Rina, Edo)"
              />
              <p className="mt-1.5 text-[12px] text-red-300/90 font-medium">Tulis nama anggota dipisah tanda koma (,)</p>
            </div>
          </div>

          {/* Tombol Mulai Battle */}
          <div className="text-center pt-4">
            <button
              onClick={start}
              disabled={!isFormValid}
              className={`pixel-button px-10 py-4 text-xl font-bold uppercase transition-all ${
                isFormValid
                  ? "bg-green-500 hover:bg-green-400 text-slate-950 cursor-pointer shadow-[0_4px_15px_rgba(34,197,94,0.6)]"
                  : "bg-slate-600 text-slate-400 cursor-not-allowed opacity-60"
              }`}
            >
              ⚔️ START BATTLE
            </button>
            {!isFormValid && (
              <p className="mt-2 text-xs text-yellow-200 font-bold opacity-80">
                * Masukkan Nama Tim A dan Tim B untuk memulai battle
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default function Setup() {
  return (
    <Suspense fallback={<div className="min-h-screen sky grid place-items-center"><div className="text-white text-2xl">Loading...</div></div>}>
      <SetupContent />
    </Suspense>
  );
}