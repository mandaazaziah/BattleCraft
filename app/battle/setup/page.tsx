 "use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense, useEffect } from "react";
import PixelButton from "@/components/PixelButton";
import { useSoundSystem } from "@/lib/useSound";

function SetupContent() {
  const params = useSearchParams();
  const router = useRouter();
  const category = params.get("category") === "numerasi" ? "numerasi" : "literasi";
  const { play } = useSoundSystem();

  // Sound effect saat halaman setup dibuka
  useEffect(() => {
    const t = setTimeout(() => play("setup_enter"), 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [membersAStr, setMembersAStr] = useState("");
  const [membersBStr, setMembersBStr] = useState("");
  const [timePerQ, setTimePerQ] = useState(20); // detik per soal, 0 = tanpa batas
  const [error, setError] = useState("");

  // Validasi: Nama Tim A dan Tim B wajib diisi (anggota bersifat opsional)
  const isFormValid = a.trim() !== "" && b.trim() !== "";

  const start = () => {
    if (!a.trim() || !b.trim()) {
      setError("Nama Tim A dan Tim B wajib diisi!");
      play("wrong");
      return;
    }

    play("battle_start");
    setError("");
    // Parse anggota tim dari string berpemisah koma (opsional)
    const membersA = membersAStr
      ? membersAStr.split(",").map((m) => m.trim()).filter(Boolean)
      : [];
    const membersB = membersBStr
      ? membersBStr.split(",").map((m) => m.trim()).filter(Boolean)
      : [];

    const payload = { category, difficulty: "medium", a: a.trim(), b: b.trim(), membersA, membersB, timePerQ };
    sessionStorage.setItem("battleSetup", JSON.stringify(payload));
    router.push("/battle/play");
  };

  return (
    <main className="sky relative min-h-screen p-4 md:p-10 flex items-center justify-center">
      {/* Overlay gradien halus agar kontras dan terbaca jelas */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 pointer-events-none" />

      {/* Main Voxel Game Panel Box (Minecraft Stone/Deepslate UI Frame) */}
      <div className="relative z-10 mx-auto max-w-3xl w-full mc-dark-stone-brick p-5 md:p-8 shadow-[0_12px_36px_rgba(0,0,0,0.8),inset_2px_2px_0_#5a606d,inset_-2px_-2px_0_#16171b]">
        {/* Inner Border Trim */}
        <div className="border-2 border-[#121417] bg-[#1a1c22]/95 p-5 md:p-8 relative shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
          
          {/* Header Panel Game Menu */}
          <div className="mb-6 flex items-center justify-between border-b-4 border-[#2c3038] pb-4">
            <div>
              <div className="pixel-text text-xs md:text-sm text-yellow-300 drop-shadow-[2px_2px_0_#000]">
                ⚔️ BATTLE SETUP
              </div>
              <h1 className="pixel-text mt-2 text-xl md:text-2xl text-white drop-shadow-[3px_3px_0_#000]">
                {category === "literasi" ? "📖 KATEGORI: LITERASI" : "🔢 KATEGORI: NUMERASI"}
              </h1>
            </div>
            <PixelButton href="/" className="bg-[#4b5563] text-white border-2 border-black hover:bg-[#6b7280] shadow-[3px_3px_0_#000] text-sm py-2 px-4">
              🏠 Home
            </PixelButton>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-[#991b1b] border-4 border-[#ef4444] text-white font-bold text-center text-sm shadow-[4px_4px_0_#000] animate-pulse">
              ⚠️ {error}
            </div>
          )}

          <section className="space-y-6">
            {/* Form Nama Tim (Wajib) */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Panel Team A */}
              <div className="bg-[#0f172a] p-4 border-4 border-[#1e3a8a] shadow-[inset_2px_2px_0_#3b82f6,inset_-2px_-2px_0_#091224,4px_4px_0_#000]">
                <label className="font-bold text-blue-300 flex items-center gap-2.5 text-base">
                  {/* Emblem Shield Pixel Art Team A (Biru dengan huruf A di tengah tanpa kotak pembungkus) */}
                  <svg
                    width="28"
                    height="32"
                    viewBox="0 0 14 16"
                    className="w-7 h-8 flex-shrink-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                    style={{ imageRendering: "pixelated", shapeRendering: "crispEdges" }}
                  >
                    {/* Shield Outer Outline */}
                    <path d="M2,1 h10 v8 l-5,6 l-5,-6 z" fill="#091224" />
                    {/* Shield Body Base (Blue Gradient/Layers) */}
                    <path d="M3,2 h8 v7 l-4,5 l-4,-5 z" fill="#1d4ed8" />
                    <path d="M4,3 h6 v6 l-3,4 l-3,-4 z" fill="#2563eb" />
                    <path d="M4,3 h2 v6 l1,2 v-8 z" fill="#60a5fa" />
                    {/* Gold Shield Rim Top/Corner Accent */}
                    <rect x="3" y="2" width="2" height="1" fill="#facc15" />
                    <rect x="9" y="2" width="2" height="1" fill="#ca8a04" />
                    <rect x="6" y="13" width="2" height="1" fill="#facc15" />
                    {/* Pixel Letter 'A' in Center (White/Yellow Glow) */}
                    <rect x="5" y="4" width="4" height="1" fill="#ffffff" />
                    <rect x="4" y="5" width="2" height="4" fill="#ffffff" />
                    <rect x="8" y="5" width="2" height="4" fill="#ffffff" />
                    <rect x="5" y="6" width="4" height="1" fill="#ffffff" />
                    <rect x="6" y="5" width="2" height="1" fill="#1e3a8a" />
                  </svg>
                  <span className="pixel-text text-sm text-cyan-300 drop-shadow-[1px_1px_0_#000]">Nama Team A</span>
                  <span className="text-red-400 font-bold text-xs">* (Wajib)</span>
                </label>
                <input
                  className="pixel-input mt-3 border-4 border-[#0b1329] bg-[#e2e8f0] text-slate-900 font-bold shadow-[inset_2px_2px_0_#64748b,3px_3px_0_#000]"
                  value={a}
                  onChange={(e) => { setA(e.target.value); setError(""); }}
                  placeholder="Contoh: Tim Rajawali"
                  required
                />
              </div>

              {/* Panel Team B */}
              <div className="bg-[#2a0b0e] p-4 border-4 border-[#881337] shadow-[inset_2px_2px_0_#ef4444,inset_-2px_-2px_0_#170407,4px_4px_0_#000]">
                <label className="font-bold text-red-300 flex items-center gap-2.5 text-base">
                  {/* Emblem Shield Pixel Art Team B (Merah dengan huruf B di tengah tanpa kotak pembungkus) */}
                  <svg
                    width="28"
                    height="32"
                    viewBox="0 0 14 16"
                    className="w-7 h-8 flex-shrink-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                    style={{ imageRendering: "pixelated", shapeRendering: "crispEdges" }}
                  >
                    {/* Shield Outer Outline */}
                    <path d="M2,1 h10 v8 l-5,6 l-5,-6 z" fill="#1c0507" />
                    {/* Shield Body Base (Red Gradient/Layers) */}
                    <path d="M3,2 h8 v7 l-4,5 l-4,-5 z" fill="#b91c1c" />
                    <path d="M4,3 h6 v6 l-3,4 l-3,-4 z" fill="#dc2626" />
                    <path d="M4,3 h2 v6 l1,2 v-8 z" fill="#f87171" />
                    {/* Gold Shield Rim Top/Corner Accent */}
                    <rect x="3" y="2" width="2" height="1" fill="#facc15" />
                    <rect x="9" y="2" width="2" height="1" fill="#ca8a04" />
                    <rect x="6" y="13" width="2" height="1" fill="#facc15" />
                    {/* Pixel Letter 'B' in Center (White/Yellow Glow) */}
                    <rect x="4" y="4" width="5" height="5" fill="#ffffff" />
                    <rect x="6" y="5" width="2" height="1" fill="#991b1b" />
                    <rect x="6" y="7" width="2" height="1" fill="#991b1b" />
                    <rect x="8" y="4" width="1" height="1" fill="#991b1b" />
                    <rect x="8" y="6" width="1" height="1" fill="#991b1b" />
                    <rect x="8" y="8" width="1" height="1" fill="#991b1b" />
                  </svg>
                  <span className="pixel-text text-sm text-red-300 drop-shadow-[1px_1px_0_#000]">Nama Team B</span>
                  <span className="text-red-400 font-bold text-xs">* (Wajib)</span>
                </label>
                <input
                  className="pixel-input mt-3 border-4 border-[#240608] bg-[#e2e8f0] text-slate-900 font-bold shadow-[inset_2px_2px_0_#64748b,3px_3px_0_#000]"
                  value={b}
                  onChange={(e) => { setB(e.target.value); setError(""); }}
                  placeholder="Contoh: Tim Garuda"
                  required
                />
              </div>
            </div>

            {/* Form Anggota Tim (Opsional, 1 Kotak Input Berpemisah Koma) */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#09101f] p-4 border-4 border-[#172554] shadow-[inset_1px_1px_0_#2563eb,3px_3px_0_#000]">
                <label className="font-bold text-blue-200 flex items-center justify-between text-base">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">👥</span>
                    <span className="pixel-text text-xs text-blue-200 drop-shadow-[1px_1px_0_#000]">Anggota Team A</span>
                  </div>
                  <span className="text-xs text-blue-400 font-bold">(Opsional)</span>
                </label>
                <input
                  className="pixel-input mt-2.5 border-4 border-[#091224] bg-[#f1f5f9] text-slate-900 font-medium shadow-[inset_2px_2px_0_#94a3b8,2px_2px_0_#000]"
                  value={membersAStr}
                  onChange={(e) => setMembersAStr(e.target.value)}
                  placeholder="Pisahkan koma: Budi, Siti, Andi"
                />
                <p className="mt-2 text-[13px] text-blue-300/85 font-medium">Tulis nama anggota dipisah tanda koma (,)</p>
              </div>

              <div className="bg-[#1f090b] p-4 border-4 border-[#4c0519] shadow-[inset_1px_1px_0_#e11d48,3px_3px_0_#000]">
                <label className="font-bold text-red-200 flex items-center justify-between text-base">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">👥</span>
                    <span className="pixel-text text-xs text-red-200 drop-shadow-[1px_1px_0_#000]">Anggota Team B</span>
                  </div>
                  <span className="text-xs text-red-400 font-bold">(Opsional)</span>
                </label>
                <input
                  className="pixel-input mt-2.5 border-4 border-[#190406] bg-[#f1f5f9] text-slate-900 font-medium shadow-[inset_2px_2px_0_#94a3b8,2px_2px_0_#000]"
                  value={membersBStr}
                  onChange={(e) => setMembersBStr(e.target.value)}
                  placeholder="Pisahkan koma: Doni, Rina, Edo"
                />
                <p className="mt-2 text-[13px] text-red-300/85 font-medium">Tulis nama anggota dipisah tanda koma (,)</p>
              </div>
            </div>

            {/* Waktu Pengerjaan Soal (Opsional) */}
            <div className="bg-[#1a1c22] p-4 border-4 border-[#2c3038] shadow-[inset_2px_2px_0_#3b82f6,4px_4px_0_#000]">
              <label className="font-bold text-yellow-300 flex items-center justify-between text-base">
                <div className="flex items-center gap-2">
                  <span className="text-lg">⏱️</span>
                  <span className="pixel-text text-xs text-yellow-300 drop-shadow-[1px_1px_0_#000]">Waktu Pengerjaan Soal</span>
                </div>
                <span className="text-xs text-yellow-400 font-bold">(Opsional)</span>
              </label>
              <div className="mt-3 flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max="60"
                  step="5"
                  value={timePerQ}
                  onChange={(e) => setTimePerQ(Number(e.target.value))}
                  className="flex-1 accent-yellow-400"
                />
                <span className="pixel-text text-sm text-white bg-slate-900 px-3 py-1.5 rounded border-2 border-yellow-400 w-20 text-center">
                  {timePerQ === 0 ? "TANPA BATAS" : `${timePerQ} DETIK`}
                </span>
              </div>
              <p className="mt-2 text-[13px] text-yellow-200/80 font-medium">
                Geser slider: 0 = tanpa batas waktu, 5-60 detik per soal.
              </p>
            </div>

            {/* Tombol Mulai Battle (Minecraft Green Button Style with 3D Bevel) */}
            <div className="text-center pt-3">
              <button
                onClick={start}
                disabled={!isFormValid}
                className={`pixel-text px-8 md:px-12 py-4 text-base md:text-lg uppercase transition-transform border-4 ${
                  isFormValid
                    ? "bg-[#22c55e] hover:bg-[#16a34a] text-slate-950 border-[#14532d] shadow-[inset_2px_2px_0_#86efac,inset_-2px_-2px_0_#15803d,0_6px_0_#0f3d1f,0_10px_15px_rgba(0,0,0,0.6)] cursor-pointer active:translate-y-1 active:shadow-[0_2px_0_#0f3d1f]"
                    : "bg-[#475569] text-[#94a3b8] border-[#1e293b] shadow-[inset_2px_2px_0_#64748b,inset_-2px_-2px_0_#334155,0_4px_0_#0f172a] cursor-not-allowed opacity-60"
                }`}
              >
                ⚔️ START BATTLE
              </button>
              {!isFormValid && (
                <p className="mt-3 text-xs text-yellow-300 font-bold drop-shadow-[1px_1px_0_#000]">
                  * Masukkan Nama Tim A dan Tim B untuk memulai battle
                </p>
              )}
            </div>
          </section>
        </div>
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