"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import PixelButton from "@/components/PixelButton";
import { supabase } from "@/lib/supabase";

export default function AdminLogin(){
  const [user,setUser]=useState(""); const [pass,setPass]=useState(""); const router=useRouter();
  const login=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(!supabase){alert("Supabase belum dikonfigurasi.");return;}
    const {data,error}=await supabase.from("admin_users").select("id").eq("username",user.trim()).eq("password",pass).eq("is_active",true).maybeSingle();
    if(error){alert(`Gagal login: ${error.message}`);return;}
    if(data) router.push("/admin/dashboard");
    else alert("Username atau password salah.");
  };
  return <main className="sky relative min-h-screen flex items-center justify-center overflow-hidden">
   <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black/50 pointer-events-none" />
   <div className="absolute top-5 right-5 z-20">
    <motion.div whileHover={{scale:1.05}} whileTap={{scale:.95}}><PixelButton href="/" className="bg-slate-200 text-sm">🏠 HOME</PixelButton></motion.div>
   </div>
   <motion.div initial={{opacity:0,y:30,scale:.9}} animate={{opacity:1,y:0,scale:1}} transition={{duration:.5,type:"spring",stiffness:200}} className="relative z-10 w-full max-w-md">
    <div className="flex flex-col items-center mb-8">
     <motion.div animate={{opacity:[0.4,1,0.4]}} transition={{duration:2,repeat:Infinity}} className="pixel-text text-xs text-yellow-300 mb-2">⚔ BATTLE-CRAFT ADMIN</motion.div>
     <h1 className="pixel-text text-3xl text-yellow-300 mb-3">LOGIN</h1>
     <div className="w-16 h-2 block-ground" />
    </div>
    <div className="mc-dark-stone-brick p-4">
     <form onSubmit={login} className="pixel-border rounded bg-white/50 p-8 backdrop-blur-md">
      <div className="space-y-4">
       <div>
        <label className="pixel-text text-[10px] text-black mb-1 block">USERNAME</label>
        <input className="pixel-input w-full" value={user} onChange={e=>setUser(e.target.value)} placeholder="Username" />
       </div>
       <div>
        <label className="pixel-text text-[10px] text-slate-700 mb-1 block">PASSWORD</label>
        <input className="pixel-input w-full" type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password" />
       </div>
      </div>
      <div className="flex justify-center mt-6">
       <motion.div whileHover={{scale:1.05}} whileTap={{scale:.95}} className="w-full">
        <motion.button whileHover={{boxShadow:"0 0 15px #f5cf55"}} type="submit" className="pixel-button w-full rounded bg-yellow-400 text-black py-3 font-bold">MASUK</motion.button>
       </motion.div>
      </div>
      <p className="mt-6 text-center text-slate-900 text-xs">Login dikelola oleh database Supabase.</p>
     </form>
    </div>
   </motion.div>
  </main>
}
