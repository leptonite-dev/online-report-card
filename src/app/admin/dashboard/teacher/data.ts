import { createClient } from "@/utils/supabase/client";

export async function getTeachers() {
  const supabase = createClient();

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("acc_role", "teacher");

  return data;
}
