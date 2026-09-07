 "use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PixelButton from "@/components/PixelButton";

export default function Result(){
  const router=useRouter(); const [data,setData]=useState<any>(null); const [penalty,setPenalty]=useState("");
  const penalties=["Nyanyi 1 lagu","Tepuk tangan 20 kali","Jalan seperti creeper","Pose kemenangan 10 detik","Sebutkan 5 kata baru"];
  useEffect(()=>{ const s=JSON.parse(sessionStorage.getItem("battleSetup")||"{}"); setData(s); },[]);
  const spin=()=>setPenalty(penalties[Math.floor(Math.random()*penalties.length)]);
  if(!data) return null;
  return <main className="min-h-screen bg-gradient-to-b from-indigo-700 to-slate-950 p-6 flex items-center justify-center">
    <div className="w-full max-w-3xl text-center card-glass pixel-border rounded-2xl p-8">
      <div className="text-6xl mb-4">🏆</div><div className="pixel-text text-2xl text-yellow-300">BATTLE COMPLETE!</div>
      <h1 className="text-5xl font-bold mt-5">{data.a || "TEAM A"} <span className="text-yellow-300">VS</span> {data.b || "TEAM B"}</h1>
      <p className="mt-4 text-2xl">Demo result screen — hubungkan skor dari state/database berikutnya.</p>
      <div className="mt-8 grid md:grid-cols-2 gap-4">
        <div className="bg-slate-900 rounded-lg p-5"><div className="text-yellow-300 font-bold">Pemenang</div><div className="text-3xl mt-2">🏆 Team dengan poin tertinggi</div></div>
        <div className="bg-slate-900 rounded-lg p-5"><div className="text-red-300 font-bold">Penalty Wheel</div><div className="text-3xl mt-2">{penalty || "🎡 ?"}</div><button onClick={spin} className="pixel-button mt-4 rounded bg-red-400 text-slate-950 px-5 py-3 font-bold">SPIN!</button></div>
      </div>
      <div className="mt-8 flex gap-3 justify-center flex-wrap"><PixelButton href="/splash" className="bg-green-400">BACK TO HOME</PixelButton><PixelButton href={`/battle/setup?category=${data.category||"literasi"}`} className="bg-yellow-400">PLAY AGAIN</PixelButton></div>
    </div>
  </main>
}