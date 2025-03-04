import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/database.types";
import { TSubject } from "@/types/public.database.types";

export class Subject {
  client: SupabaseClient<Database>;

  constructor(client: SupabaseClient<Database>) {
    this.client = client;
  }

  create = async (subject: Omit<TSubject, "id" | "created_at">) => {
    const { error } = await this.client.from("subjects").insert(subject);

    if (error) {
      console.error(error);
      return false;
    }

    return true;
  };

  getAll = async () => {
    const { data, error } = await this.client.from("subjects").select("*");

    if (error) console.error(error);

    return data || [];
  };

  delete = async (id: number) => {
    const { error } = await this.client.from("subjects").delete().eq("id", id);

    if (error) {
      console.error(error);
      return false;
    }

    return true;
  };
}
