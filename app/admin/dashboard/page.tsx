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
  const [search,setSearch]=useState("");
  const [showForm,setShowForm]=useState(false);
  const [editing,setEditing]=useState<Question|null>(null);
  const [qText,setQText]=useState("");
  const [qCat,setQCat]=useState<"literasi"|"numerasi">("literasi");
  const [qDiff,setQDiff]=useState<"easy"|"medium"|"hard">("easy");
  const [qOpts,setQOpts]=useState<string[]>(["","","",""]);
  const [qCorrect,setQCorrect]=useState(0);
  useEffect(()=>{if(sessionStorage.getItem("admin")!=="1")router.replace("/admin/login")},[router]);
  const logout=()=>{sessionStorage.removeItem("admin");router.push("/admin/login")};
  const filteredQs=questions.filter(q=>q.question.toLowerCase().includes(search.toLowerCase())).filter(q=>filter==="all"||q.category===filter);
  const openAdd=()=>{setEditing(null);setQText("");setQCat("literasi");setQDiff("easy");setQOpts(["","","",""]);setQCorrect(0);setShowForm(true);};
  const openEdit=(q:Question)=>{setEditing(q);setQText(q.question);setQCat(q.category);setQDiff(q.difficulty);setQOpts([...q.options]);setQCorrect(q.correct);setShowForm(true);};
  const closeForm=()=>{setShowForm(false);setEditing(null);};
  const handleSubmit=(e:any)=>{e.preventDefault();if(!qText.trim()||qOpts.some(o=>!o.trim())){alert("Isi semua field!");return;}const q:Question={id:editing?editing.id:Math.max(0,...questions.map(x=>x.id))+1,category:qCat,difficulty:qDiff,question:qText,options:[...qOpts],correct:qCorrect};if(editing){setQuestions(questions.map(x=>x.id===editing.id?q:x));}else{setQuestions([...questions,q]);}closeForm();};
  const deleteQ=(id:number)=>{if(confirm("Hapus soal ini?"))setQuestions(questions.filter(q=>q.id!==id));};
  const catCount=(cat:"literasi"|"numerasi")=>questions.filter(q=>q.category===cat).length;
  const litCount=catCount("literasi"); const numCount=catCount("numerasi");
  return <main className="sky relative min-h-screen p-5 md:p-8 overflow-hidden">
   <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black/50 pointer-events-none" />
   {[...Array(6)].map((_,i)=><motion.div key={"tl"+i} className="absolute md:block hidden" style={{top:20+i*10,left:10}}><div className="w-3 h-3 mc-dark-stone-brick" /></motion.div>)}
   {[...Array(6)].map((_,i)=><motion.div key={"bl"+i} className="absolute md:block hidden" style={{bottom:20+i*10,left:10}}><div className="w-3 h-3 mc-dark-stone-brick" /></motion.div>)}
   {[...Array(6)].map((_,i)=><motion.div key={"tr"+i} className="absolute md:block hidden" style={{top:20+i*10,right:10}}><div className="w-3 h-3 mc-dark-stone-brick" /></motion.div>)}
   {[...Array(6)].map((_,i)=><motion.div key={"br"+i} className="absolute md:block hidden" style={{bottom:20+i*10,right:10}}><div className="w-3 h-3 mc-dark-stone-brick" /></motion.div>)}
   <div className="relative z-10 max-w-6xl mx-auto">
    <header className="flex flex-wrap justify-between gap-4 items-center mb-6 pb-4 border-b-2 border-yellow-300/30">
     <div>
      <motion.div className="pixel-text text-xs text-yellow-300 mb-1">⚔ BATTLE-CRAFT ADMIN</motion.div>
      <motion.h1 initial={{x:-20}} animate={{x:0}} className="text-4xl font-bold text-yellow-300">Question Manager</motion.h1>
     </div>
     <div className="flex gap-2">
      <motion.div whileHover={{scale:1.08}} whileTap={{scale:.92}}><PixelButton href="/" className="bg-slate-200 text-sm">🏠 HOME</PixelButton></motion.div>
      <motion.button whileHover={{scale:1.08}} whileTap={{scale:.92}} onClick={logout} className="pixel-button rounded bg-red-400 px-5 py-3 font-bold">LOGOUT</motion.button>
     </div>
    </header>
     <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
      <motion.div whileHover={{y:-6,scale:1.02}} className="pixel-border rounded bg-white/50 p-4 text-center backdrop-blur-md">
       <div className="text-2xl mb-1">📚</div>
       <div className="text-slate-900 font-bold">Total Soal</div>
       <div className="text-3xl font-bold text-white">{questions.length}</div>
      </motion.div>
      <motion.div whileHover={{y:-6,scale:1.02}} className="pixel-border rounded bg-white/50 p-4 text-center backdrop-blur-md">
       <div className="text-2xl mb-1">📖</div>
       <div className="text-slate-900 font-bold">Literasi</div>
       <div className="text-3xl font-bold text-white">{litCount}</div>
      </motion.div>
      <motion.div whileHover={{y:-6,scale:1.02}} className="pixel-border rounded bg-white/50 p-4 text-center backdrop-blur-md">
       <div className="text-2xl mb-1">🔢</div>
       <div className="text-slate-900 font-bold">Numerasi</div>
       <div className="text-3xl font-bold text-white">{numCount}</div>
      </motion.div>
     </div>
    <div className="bg-white/50 pixel-border rounded p-4 mb-4 backdrop-blur-md">
     <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
      <div className="flex flex-wrap gap-2">
       <motion.button whileHover={{scale:1.05}} whileTap={{scale:.95}} onClick={()=>setFilter("all")} className={`pixel-button rounded px-4 py-2 font-bold transition-all ${filter==="all"?"bg-yellow-400 ring-2 ring-yellow-500":"bg-yellow-300"}`}>Semua ({questions.length})</motion.button>
       <motion.button whileHover={{scale:1.05}} whileTap={{scale:.95}} onClick={()=>setFilter("literasi")} className={`pixel-button rounded px-4 py-2 font-bold transition-all ${filter==="literasi"?"bg-blue-400 ring-2 ring-blue-500 text-white":"bg-blue-300"}`}>Literasi ({litCount})</motion.button>
       <motion.button whileHover={{scale:1.05}} whileTap={{scale:.95}} onClick={()=>setFilter("numerasi")} className={`pixel-button rounded px-4 py-2 font-bold transition-all ${filter==="numerasi"?"bg-green-400 ring-2 ring-green-500 text-white":"bg-green-300"}`}>Numerasi ({numCount})</motion.button>
      </div>
      <div className="flex gap-2">
       <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Cari soal..." className="pixel-input w-48 text-sm" />
       <motion.button whileHover={{scale:1.1,rotate:5}} whileTap={{scale:.95}} onClick={openAdd} className="pixel-button rounded bg-indigo-500 text-white px-5 py-3 font-bold shadow-[3px_3px_0_#0b1119] relative group">
        + Tambah Soal
        <motion.span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center" style={{display:editing?"none":"block"}}>NEW</motion.span>
       </motion.button>
      </div>
     </div>
    </div>
    <div className="pixel-border rounded bg-white/50 overflow-hidden shadow-xl backdrop-blur-md">
     <table className="w-full text-left">
      <thead className="bg-slate-900/70 text-white backdrop-blur-md">
       <tr><th className="p-3">No</th><th className="p-3">Kategori</th><th className="p-3">Pertanyaan</th><th className="p-3">Jawaban</th><th className="p-3">Aksi</th></tr>
      </thead>
      <tbody>
       {filteredQs.length===0?(<tr><td colSpan={5} className="p-6 text-center text-slate-500 pixel-text text-sm">📭 Tidak ada soal ditemukan</td></tr>):filteredQs.map((q,i)=>
        <motion.tr key={q.id} initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:20}} transition={{delay:i*0.03}} className="border-t hover:bg-indigo-50/50 group">
         <td className="p-3 text-black font-bold">{i+1}</td>
         <td className="p-3"><span className={`pixel-text text-[10px] px-2 py-1 rounded ${q.category==="literasi"?"bg-blue-100 text-blue-700":"bg-green-100 text-green-700"}`}>{q.category}</span></td>
         <td className="p-3 min-w-[300px] text-black">{q.question}</td>
         <td className="p-3 text-sm text-slate-500 font-bold">Opsi {String.fromCharCode(65+q.correct)}</td>
         <td className="p-3 whitespace-nowrap space-x-2">
          <motion.button whileHover={{scale:1.15}} whileTap={{scale:.9}} onClick={()=>openEdit(q)} className="font-bold text-indigo-700 hover:text-indigo-900">✏ Edit</motion.button>
          <motion.button whileHover={{scale:1.15}} whileTap={{scale:.9}} onClick={()=>deleteQ(q.id)} className="font-bold text-red-600 hover:text-red-800">🗑 Hapus</motion.button>
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
     <motion.div initial={{scale:.8,opacity:0,y:50}} animate={{scale:1,opacity:1,y:0}} exit={{scale:.8,opacity:0,y:50}} transition={{type:"spring",stiffness:300,damping:20}} className="relative z-10 w-full max-w-2xl pixel-border rounded bg-white/50 p-8 overflow-y-auto max-h-[90vh] backdrop-blur-md">
      <div className="flex items-center justify-between mb-4">
       <h2 className="pixel-text text-xl text-slate-800">{editing?"✏ EDIT SOAL":"➕ TAMBAH SOAL"}</h2>
       <motion.button whileHover={{scale:1.2,rotate:90}} onClick={closeForm} className="text-xl text-slate-500 hover:text-red-500">✕</motion.button>
      </div>
       <form onSubmit={handleSubmit} className="space-y-4">
        <div>
         <label className="pixel-text text-[10px] text-slate-600 block mb-1">KATEGORI</label>
         <div className="flex gap-2"><label className="flex items-center gap-1 text-slate-600"><input type="radio" name="cat" checked={qCat==="literasi"} onChange={()=>setQCat("literasi")} />Literasi</label><label className="flex items-center gap-1 text-slate-600"><input type="radio" name="cat" checked={qCat==="numerasi"} onChange={()=>setQCat("numerasi")} />Numerasi</label></div>
        </div>
        <div>
         <label className="pixel-text text-[10px] text-slate-600 block mb-1">PERTANYAAN</label>
        <textarea value={qText} onChange={e=>setQText(e.target.value)} className="pixel-input w-full min-h-[80px] resize-none" placeholder="Masukkan pertanyaan..." />
       </div>
       <div>
        <label className="pixel-text text-[10px] text-slate-600 block mb-1">OPSI JAWABAN (PILIH YANG BENAR)</label>
        <div className="space-y-2">
         {qOpts.map((opt,idx)=>
          <div key={idx} className="flex items-center gap-2 p-2 rounded hover:bg-slate-50">
           <input type="radio" name="correct" checked={qCorrect===idx} onChange={()=>setQCorrect(idx)} className="accent-indigo-600" />
           <span className={`pixel-text text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full ${qCorrect===idx?"bg-indigo-500 text-white":"bg-slate-200 text-slate-600"}`}>{String.fromCharCode(65+idx)}</span>
           <input value={opt} onChange={e=>{const newOpts=[...qOpts];newOpts[idx]=e.target.value;setQOpts(newOpts);}} className="pixel-input flex-1 text-sm" placeholder={`Opsi ${String.fromCharCode(65+idx)}`} />
          </div>
         )}
        </div>
       </div>
       <div className="flex gap-3 pt-4 border-t">
        <motion.button type="submit" whileHover={{scale:1.03}} whileTap={{scale:.97}} className="pixel-button rounded bg-indigo-500 text-white px-6 py-3 font-bold flex-1">💾 {editing?"UPDATE":"SIMPAN"}</motion.button>
        <motion.button type="button" whileHover={{scale:1.03}} whileTap={{scale:.97}} onClick={closeForm} className="pixel-button rounded bg-slate-400 px-6 py-3 font-bold flex-1">BATAL</motion.button>
       </div>
      </form>
     </motion.div>
    </motion.div>
    }
   </AnimatePresence>
  </main>
}
