 "use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PixelButton from "@/components/PixelButton";

export default function AdminLogin(){
 const [user,setUser]=useState(""); const [pass,setPass]=useState(""); const router=useRouter();
 const login=(e:any)=>{e.preventDefault(); if(user==="admin"&&pass==="admin123"){sessionStorage.setItem("admin","1");router.push("/admin/dashboard")} else alert("Demo login: admin / admin123")};
 return <main className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
  <form onSubmit={login} className="w-full max-w-md card-glass pixel-border rounded-xl p-8">
   <div className="pixel-text text-xs text-yellow-300">ADMIN GURU</div><h1 className="text-4xl font-bold mt-4">Login</h1>
   <input className="pixel-input mt-7" value={user} onChange={e=>setUser(e.target.value)} placeholder="Username"/>
   <input className="pixel-input mt-3" type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password"/>
   <div className="flex gap-3 mt-6"><PixelButton type="submit" className="bg-yellow-400">LOGIN</PixelButton><PixelButton href="/" className="bg-slate-100">HOME</PixelButton></div>
   <p className="mt-5 text-slate-300 text-sm">Demo: admin / admin123. Ganti dengan Supabase Auth sebelum production.</p>
  </form>
 </main>
}