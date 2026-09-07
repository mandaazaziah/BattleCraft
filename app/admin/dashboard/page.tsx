 "use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PixelButton from "@/components/PixelButton";
import { sampleQuestions } from "@/lib/sampleQuestions";

export default function Dashboard(){
 const router=useRouter(); const [filter,setFilter]=useState("all");
 useEffect(()=>{if(sessionStorage.getItem("admin")!=="1")router.replace("/admin/login")},[router]);
 const logout=()=>{sessionStorage.removeItem("admin");router.push("/admin/login")};
 const qs=sampleQuestions.filter(q=>filter==="all"||q.category===filter);
 return <main className="min-h-screen bg-slate-100 text-slate-950 p-5 md:p-8">
  <div className="max-w-6xl mx-auto">
   <header className="flex flex-wrap justify-between gap-4 items-center mb-6"><div><div className="pixel-text text-xs text-indigo-700">PIXEL QUEST ADMIN</div><h1 className="text-4xl font-bold mt-2">Question Manager</h1></div><div className="flex gap-2"><PixelButton href="/" className="bg-slate-200">HOME</PixelButton><button onClick={logout} className="pixel-button rounded bg-red-400 px-5 py-3 font-bold">LOGOUT</button></div></header>
   <div className="grid md:grid-cols-3 gap-4 mb-6">
    <div className="pixel-border rounded bg-white p-5"><div className="text-slate-500">Total Soal Demo</div><div className="text-4xl font-bold">{sampleQuestions.length}</div></div>
    <div className="pixel-border rounded bg-white p-5"><div className="text-slate-500">Literasi</div><div className="text-4xl font-bold">{sampleQuestions.filter(q=>q.category==="literasi").length}</div></div>
    <div className="pixel-border rounded bg-white p-5"><div className="text-slate-500">Numerasi</div><div className="text-4xl font-bold">{sampleQuestions.filter(q=>q.category==="numerasi").length}</div></div>
   </div>
   <div className="flex gap-2 mb-4"><button onClick={()=>setFilter("all")} className="pixel-button rounded bg-yellow-300 px-4 py-2 font-bold">Semua</button><button onClick={()=>setFilter("literasi")} className="pixel-button rounded bg-blue-300 px-4 py-2 font-bold">Literasi</button><button onClick={()=>setFilter("numerasi")} className="pixel-button rounded bg-green-300 px-4 py-2 font-bold">Numerasi</button><button onClick={()=>alert("Form CRUD siap diintegrasikan ke Supabase")} className="pixel-button rounded bg-indigo-500 text-white px-4 py-2 font-bold">+ Tambah Soal</button></div>
   <div className="overflow-auto pixel-border rounded bg-white"><table className="w-full text-left"><thead className="bg-slate-900 text-white"><tr><th className="p-3">No</th><th>Kategori</th><th>Difficulty</th><th>Pertanyaan</th><th>Aksi</th></tr></thead><tbody>{qs.map(q=><tr key={q.id} className="border-t"><td className="p-3">{q.id}</td><td>{q.category}</td><td>{q.difficulty}</td><td className="p-3 min-w-[320px]">{q.question}</td><td className="p-3 whitespace-nowrap"><button className="font-bold text-indigo-700 mr-3" onClick={()=>alert("Edit demo")}>Edit</button><button className="font-bold text-red-600" onClick={()=>alert("Delete demo")}>Delete</button></td></tr>)}</tbody></table></div>
  </div>
 </main>
}