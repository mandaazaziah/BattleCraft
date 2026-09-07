"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import PixelButton from "@/components/PixelButton";
import { Question, sampleQuestions } from "@/lib/sampleQuestions";

export default function Dashboard(){
  const router=useRouter();
  const [questions,setQuestions]=useState<Question[]>([...sampleQuestions]);
  const [filter,setFilter]=useState("all");
  const [showForm,setShowForm]=useState(false);
  const [editing,setEditing]=useState<Question|null>(null);
  const [qText,setQText]=useState("");
  const [qCat,setQCat]=useState<"literasi"|"numerasi">("literasi");
  const [qDiff,setQDiff]=useState<"easy"|"medium"|"hard">("easy");
  const [qOpts,setQOpts]=useState<string[]>(["","","",""]);
  const [qCorrect,setQCorrect]=useState(0);
  useEffect(()=>{if(sessionStorage.getItem("admin")!=="1")router.replace("/admin/login")},[router]);
  const logout=()=>{sessionStorage.removeItem("admin");router.push("/admin/login")};
  const qs=questions.filter(q=>filter==="all"||q.category===filter);
  const openAdd=()=>{setEditing(null);setQText("");setQCat("literasi");setQDiff("easy");setQOpts(["","","",""]);setQCorrect(0);setShowForm(true);};
  const openEdit=(q:Question)=>{setEditing(q);setQText(q.question);setQCat(q.category);setQDiff(q.difficulty);setQOpts([...q.options]);setQCorrect(q.correct);setShowForm(true);};
  const closeForm=()=>{setShowForm(false);setEditing(null);};
  const handleSubmit=(e:any)=>{e.preventDefault();if(!qText.trim()||qOpts.some(o=>!o.trim())){alert("Isi semua field!");return;}const q:Question={id:editing?editing.id:Math.max(0,...questions.map(x=>x.id))+1,category:qCat,difficulty:qDiff,question:qText,options:[...qOpts],correct:qCorrect};if(editing){setQuestions(questions.map(x=>x.id===editing.id?q:x));}else{setQuestions([...questions,q]);}closeForm();};
  const deleteQ=(id:number)=>{if(confirm("Hapus soal ini?"))setQuestions(questions.filter(q=>q.id!==id));};
  return <main className="sky relative min-h-screen p-5 md:p-8 overflow-hidden">
   <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black/50 pointer-events-none" />
   <div className="relative z-10 max-w-6xl mx-auto">
    <header className="flex flex-wrap justify-between gap-4 items-center mb-6"><div><div className="pixel-text text-xs text-yellow-300 mb-2">⚔ BATTLECRAFT ADMIN</div><h1 className="text-4xl font-bold mt-2 text-yellow-300">Question Manager</h1></div><div className="flex gap-2"><motion.div whileHover={{scale:1.05}}><PixelButton href="/" className="bg-slate-200">🏠 HOME</PixelButton></motion.div><motion.button whileHover={{scale:1.05}} whileTap={{scale:.95}} onClick={logout} className="pixel-button rounded bg-red-400 px-5 py-3 font-bold">LOGOUT</motion.button></div></header>
    <motion.div whileHover={{y:-4}} className="pixel-border rounded bg-white p-5 mb-6"><div className="text-black font-bold">Total Soal</div><div className="text-3xl font-bold text-black">{questions.length}</div></motion.div>
    <div className="flex flex-wrap gap-2 mb-4">
     <button onClick={()=>setFilter("all")} className="pixel-button rounded bg-yellow-300 px-4 py-2 font-bold">Semua ({questions.length})</button>
     <button onClick={()=>setFilter("literasi")} className="pixel-button rounded bg-blue-300 px-4 py-2 font-bold">Literasi ({questions.filter(q=>q.category==="literasi").length})</button>
     <button onClick={()=>setFilter("numerasi")} className="pixel-button rounded bg-green-300 px-4 py-2 font-bold">Numerasi ({questions.filter(q=>q.category==="numerasi").length})</button>
     <motion.button whileHover={{scale:1.03}} whileTap={{scale:.97}} onClick={openAdd} className="pixel-button rounded bg-indigo-500 text-white px-4 py-2 font-bold">+ Tambah Soal</motion.button>
    </div>
    <div className="pixel-border rounded bg-white overflow-hidden">
     <table className="w-full text-left">
      <thead className="bg-slate-900 text-white"><tr><th className="p-3">No</th><th className="p-3">Kategori</th><th className="p-3">Difficulty</th><th className="p-3">Pertanyaan</th><th className="p-3">Jawaban</th><th className="p-3">Aksi</th></tr></thead>
      <tbody>
       {qs.length===0?<tr><td colSpan={6} className="p-4 text-center text-slate-500">Tidak ada soal</td></tr>:qs.map((q,i)=>
        <motion.tr key={q.id} initial={{opacity:0}} animate={{opacity:1}} className="border-t hover:bg-slate-50">
         <td className="p-3">{i+1}</td>
         <td className="p-3"><span className={`pixel-text text-[10px] px-2 py-1 rounded ${q.category==="literasi"?"bg-blue-100 text-blue-700":"bg-green-100 text-green-700"}`}>{q.category}</span></td>
         <td className="p-3"><span className={`pixel-text text-[10px] px-2 py-1 rounded ${q.difficulty==="hard"?"bg-red-100 text-red-700":q.difficulty==="medium"?"bg-amber-100 text-amber-700":"bg-emerald-100 text-emerald-700"}`}>{q.difficulty}</span></td>
         <td className="p-3 min-w-[320px] text-black">{q.question}</td>
         <td className="p-3 text-xs text-slate-500">Opsi {String.fromCharCode(65+q.correct)}</td>
         <td className="p-3 whitespace-nowrap space-x-2">
          <motion.button whileHover={{scale:1.1}} onClick={()=>openEdit(q)} className="font-bold text-indigo-700">✏ Edit</motion.button>
          <motion.button whileHover={{scale:1.1}} onClick={()=>deleteQ(q.id)} className="font-bold text-red-600">🗑 Hapus</motion.button>
         </td>
        </motion.tr>
       )}
      </tbody>
     </table>
    </div>
   </div>

   <AnimatePresence>
   {showForm&&
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 flex items-center justify-center p-4">
     <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeForm} />
     <motion.div initial={{scale:.9,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:.9,opacity:0}} transition={{type:"spring",stiffness:300}} className="relative z-10 w-full max-w-2xl pixel-border rounded bg-white/95 p-8 overflow-y-auto max-h-[90vh]">
      <h2 className="pixel-text text-xl text-slate-800 mb-4">{editing?"EDIT SOAL":"TAMBAH SOAL"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
       <div>
        <label className="pixel-text text-[10px] text-slate-600 block mb-1">KATEGORI</label>
        <div className="flex gap-2"><label className="flex items-center gap-1"><input type="radio" name="cat" checked={qCat==="literasi"} onChange={()=>setQCat("literasi")} />Literasi</label><label className="flex items-center gap-1"><input type="radio" name="cat" checked={qCat==="numerasi"} onChange={()=>setQCat("numerasi")} />Numerasi</label></div>
       </div>
       <div>
        <label className="pixel-text text-[10px] text-slate-600 block mb-1">DIFFICULTY</label>
        <select value={qDiff} onChange={e=>setQDiff(e.target.value as any)} className="pixel-input">
         <option value="easy">Easy</option><option value="medium">Medium</option><option value="hard">Hard</option>
        </select>
       </div>
       <div>
        <label className="pixel-text text-[10px] text-slate-600 block mb-1">PERTANYAAN</label>
        <input value={qText} onChange={e=>setQText(e.target.value)} className="pixel-input" placeholder="Masukkan pertanyaan..." />
       </div>
       <div>
        <label className="pixel-text text-[10px] text-slate-600 block mb-1">OPSI JAWABAN</label>
        <div className="space-y-2"><label className="pixel-text text-[10px] text-slate-600 block mb-1">Jawaban Benar</label>
        {qOpts.map((opt,idx)=>
         <div key={idx} className="flex items-center gap-2">
          <input type="radio" name="correct" checked={qCorrect===idx} onChange={()=>setQCorrect(idx)} />
          <span className="pixel-text text-[10px] text-slate-500 w-4">{String.fromCharCode(65+idx)}</span>
          <input value={opt} onChange={e=>{const newOpts=[...qOpts];newOpts[idx]=e.target.value;setQOpts(newOpts);}} className="pixel-input flex-1" placeholder={`Opsi ${String.fromCharCode(65+idx)}`} />
         </div>
        )}
        </div>
       </div>
       <div className="flex gap-3 pt-4 border-t">
        <motion.button type="submit" whileHover={{scale:1.03}} whileTap={{scale:.97}} className="pixel-button rounded bg-indigo-500 text-white px-5 py-3 font-bold">{editing?"UPDATE":"SIMPAN"}</motion.button>
        <motion.button type="button" whileHover={{scale:1.03}} whileTap={{scale:.97}} onClick={closeForm} className="pixel-button rounded bg-slate-300 px-5 py-3 font-bold">BATAL</motion.button>
       </div>
      </form>
     </motion.div>
    </motion.div>
   }
   </AnimatePresence>
  </main>
}
