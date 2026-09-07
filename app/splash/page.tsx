 "use client";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Splash() {
  const router = useRouter();
  useEffect(()=>{ const t=setTimeout(()=>router.replace("/"), 2200); return ()=>clearTimeout(t); },[router]);
  return <main className="min-h-screen sky flex items-center justify-center relative overflow-hidden">
    <div className="z-10 text-center">
      <motion.div animate={{y:[0,-10,0]}} transition={{repeat:Infinity,duration:1.8}} className="text-7xl mb-8">⛏️</motion.div>
      <motion.h1 initial={{scale:.7,opacity:0}} animate={{scale:1,opacity:1}} className="pixel-text text-3xl md:text-5xl drop-shadow-[5px_5px_0_#17202a]">PIXEL QUEST</motion.h1>
      <p className="mt-5 text-2xl">EDUCATION BATTLE</p>
      <div className="mx-auto mt-8 h-6 w-72 border-4 border-slate-950 bg-slate-900">
        <motion.div initial={{width:0}} animate={{width:"100%"}} transition={{duration:2}} className="h-full bg-green-400"/>
      </div>
      <p className="mt-3 text-slate-900 font-bold">Loading world...</p>
    </div>
  </main>;
}