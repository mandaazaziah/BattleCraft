import Link from "next/link";

export default function PixelButton({ children, href, onClick, type="button", className="" }: any) {
  const base = `pixel-button inline-flex items-center justify-center rounded-md bg-yellow-400 px-5 py-3 font-bold text-slate-950 ${className}`;
  if (href) return <Link href={href} className={base}>{children}</Link>;
  return <button type={type} onClick={onClick} className={base}>{children}</button>;
}