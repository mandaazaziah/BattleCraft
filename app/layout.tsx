import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BattleCraft — Education Battle",
  description: "Minecraft-inspired literacy and numeracy learning battle.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="id"><body>{children}</body></html>;
}