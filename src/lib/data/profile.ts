import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../../types/database.types";

export class Profile {
  client: SupabaseClient<Database>;

  constructor(client: SupabaseClient<Database>) {
    this.client = client;
  }

  getAll = async () => {
    const { data, error } = await this.client.from("profiles").select("*");

    if (error) console.error(error);

    return data || [];
  };

  getAllTeachers = async () => {
    const { data, error } = await this.client
      .from("profiles")
      .select("*")
      .eq("acc_role", "teacher");

    if (error) console.error(error);

    return data || [];
  };

  delete = async (id: string) => {
    const { error } = await this.client.from("profiles").delete().eq("id", id);

    if (error) {
      console.error(error);
      return false;
    }

    return true;
  };
}
