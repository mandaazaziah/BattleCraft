 "use client";
import { useState } from "react";

export default function SoundButton() {
  const [on, setOn] = useState(true);
  return <button onClick={()=>setOn(!on)} className="rounded bg-slate-950/60 px-3 py-2">{on ? "🔊" : "🔇"}</button>;
}