import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../../types/database.types";

export class ClassRoom {
  client: SupabaseClient<Database>;

  constructor(client: SupabaseClient<Database>) {
    this.client = client;
  }

  table = () => {
    return this.client.from("classes");
  };

  getAll = async () => {
    const { data, error } = await this.client.from("classes").select("*");

    if (error) console.error(error);

    return data || [];
  };

  async getAllBy(where: { col: string; val: number | string }[]) {
    let query = this.table().select();

    where.forEach(({ col, val }) => {
      query = query.eq(col, val);
    });

    const { data, error } = await query.select("*");

    if (error) console.error("Cannot get class rooms", error);

    return data || [];
  }

  delete = async (id: number) => {
    const { error } = await this.client.from("classes").delete().eq("id", id);

    if (error) {
      console.error(error);
      return false;
    }

    return true;
  };
}
