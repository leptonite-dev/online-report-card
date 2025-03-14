import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../../types/database.types";

export type TClassRoomResponse = {
  academic_year_even: number;
  academic_year_odd: number;
  code: string;
  created_at: string;
  grade: number;
  id: number;
  teacher_id: string;
  teacher: {
    id: string;
    name: string | null;
  };
};

export class ClassRoom {
  client: SupabaseClient<Database>;

  constructor(client: SupabaseClient<Database>) {
    this.client = client;
  }

  table = () => {
    return this.client.from("classes");
  };

  async getBy(where: { col: string; val: number | string }[]) {
    let query = this.table().select();

    where.forEach(({ col, val }) => {
      query = query.eq(col, val);
    });

    const { data, error } = await query.select(
      "*, teacher: teacher_id (id, name)"
    );

    if (error) console.error("Cannot get class room", error);

    return data ? data[0] : undefined;
  }

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
