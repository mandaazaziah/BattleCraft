import { supabase } from "@/lib/supabase";

export type Team = "A" | "B";

export type BattleSetup = {
  id: string;
  category: "literasi" | "numerasi";
  a: string;
  b: string;
  membersA: string[];
  membersB: string[];
};

export function battleUrl(id: string, path = "/battle/play") {
  return `${path}?battle=${encodeURIComponent(id)}`;
}

export async function loadBattleSetup(id: string): Promise<BattleSetup | null> {
  if (!supabase) return null;
  const [{ data: battle, error: battleError }, { data: members, error: membersError }] = await Promise.all([
    supabase.from("battles").select("*").eq("id", id).single(),
    supabase.from("team_members").select("team,name").eq("battle_id", id).order("id"),
  ]);

  if (battleError || membersError || !battle) return null;
  return {
    id: battle.id,
    category: battle.category,
    a: battle.team_a_name,
    b: battle.team_b_name,
    membersA: (members ?? []).filter((member) => member.team === "A").map((member) => member.name),
    membersB: (members ?? []).filter((member) => member.team === "B").map((member) => member.name),
  };
}