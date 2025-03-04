import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/database.types";
import { TClassSubjectTeacher } from "@/types/public.database.types";

export class SubjectClassroom {
  client: SupabaseClient<Database>;

  constructor(client: SupabaseClient<Database>) {
    this.client = client;
  }

  create = async (data: TClassSubjectTeacher) => {
    const { error } = await this.client
      .from("class_subject_teacher")
      .insert(data);

    if (error) {
      console.error(error);
      return false;
    }

    return true;
  };

  getAll = async () => {
    const { data, error } = await this.client.from("subject_classroom").select(`
      *,
      subjects (*),
      classes (*)
    `);

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
