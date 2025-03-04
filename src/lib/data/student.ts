import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/database.types";
import { TStudent } from "@/types/public.database.types";

export class Student {
  client: SupabaseClient<Database>;

  constructor(client: SupabaseClient<Database>) {
    this.client = client;
  }

  create = async (student: Omit<TStudent, "id" | "created_at">) => {
    const { error } = await this.client.from("students").insert(student);

    if (error) {
      console.error(error);
      return false;
    }

    return true;
  };

  getAll = async () => {
    const { data, error } = await this.client.from("students").select("*");

    if (error) console.error(error);

    return data || [];
  };

  getByClassId = async (classId: number) => {
    const { data, error } = await this.client
      .from("students")
      .select("*")
      .eq("class_id", classId);

    if (error) console.error(error);

    return data || [];
  };

  update = async (student: TStudent) => {
    const { error } = await this.client
      .from("students")
      .update(student)
      .eq("id", student.id);

    if (error) {
      console.error(error);
      return false;
    }

    return true;
  };
}
