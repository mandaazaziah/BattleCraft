 "use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react";
import PixelButton from "@/components/PixelButton";

function SetupContent() {
  const params=useSearchParams(); const router=useRouter();
  const category=params.get("category")==="numerasi" ? "numerasi" : "literasi";
  const [difficulty,setDifficulty]=useState("medium");
  const [a,setA]=useState(""); const [b,setB]=useState("");
  const [membersA,setMembersA]=useState(["",""]); const [membersB,setMembersB]=useState(["",""]);
  const update=(arr:any[],i:number,v:string)=>arr.map((x,j)=>j===i?v:x);
  const start=()=>{
    const payload={category,difficulty,a,b,membersA,membersB};
    sessionStorage.setItem("battleSetup",JSON.stringify(payload));
    router.push("/battle/play");
  };
  return <main className="min-h-screen bg-[#6dbd4c] p-6 md:p-10">
    <div className="mx-auto max-w-4xl card-glass pixel-border rounded-xl p-6 md:p-10">
      <div className="mb-8 flex items-center justify-between">
        <div><div className="pixel-text text-xs text-yellow-300">BATTLE SETUP</div><h1 className="mt-3 text-4xl font-bold">{category==="literasi"?"📖 Literasi":"🔢 Numerasi"}</h1></div>
        <PixelButton href="/" className="bg-slate-100 text-sm">Home</PixelButton>
      </div>
      <section className="space-y-8">
        <div><label className="font-bold">1. Tingkat Kesulitan</label><div className="grid grid-cols-3 gap-3 mt-3">
          {["easy","medium","hard"].map(x=><button key={x} onClick={()=>setDifficulty(x)} className={`pixel-button p-4 rounded font-bold uppercase ${difficulty===x?"bg-yellow-400 text-slate-950":"bg-slate-700"}`}>{x}</button>)}
        </div></div>
        <div className="grid md:grid-cols-2 gap-6">
          <div><label className="font-bold">2. Nama Team A</label><input className="pixel-input mt-2" value={a} onChange={e=>setA(e.target.value)} placeholder="Contoh: Creeper Squad"/></div>
          <div><label className="font-bold">3. Nama Team B</label><input className="pixel-input mt-2" value={b} onChange={e=>setB(e.target.value)} placeholder="Contoh: Diamond Crew"/></div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div><label className="font-bold">4. Anggota Team A</label>{membersA.map((m,i)=><input key={i} className="pixel-input mt-2" value={m} onChange={e=>setMembersA(update(membersA,i,e.target.value))} placeholder={`Anggota ${i+1}`}/>)}</div>
          <div><label className="font-bold">5. Anggota Team B</label>{membersB.map((m,i)=><input key={i} className="pixel-input mt-2" value={m} onChange={e=>setMembersB(update(membersB,i,e.target.value))} placeholder={`Anggota ${i+1}`}/>)}</div>
        </div>
        <div className="text-center pt-4"><PixelButton onClick={start} className="bg-green-400 px-10 py-4 text-xl">⚔️ START BATTLE</PixelButton></div>
      </section>
    </div>
  </main>;
}

export default function Setup() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#6dbd4c] grid place-items-center"><div className="text-white text-2xl">Loading...</div></div>}>
      <SetupContent />
    </Suspense>
  );
}