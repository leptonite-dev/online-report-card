import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../../types/database.types";

export class ClassRoom {
  client: SupabaseClient<Database>;

  constructor(client: SupabaseClient<Database>) {
    this.client = client;
  }

  getAll = async () => {
    const { data, error } = await this.client.from("classes").select("*");

    if (error) console.error(error);

    return data || [];
  };

  delete = async (id: number) => {
    const { error } = await this.client.from("classes").delete().eq("id", id);

    if (error) {
      console.error(error);
      return false;
    }

    return true;
  };
}
