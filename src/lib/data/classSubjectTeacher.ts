import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/database.types";

export class ClassSubjectTeacher {
  client: SupabaseClient<Database>;

  constructor(client: SupabaseClient<Database>) {
    this.client = client;
  }

  query = () => {
    return this.client.from("class_subject_teacher").select(`
      subjects (name) as subject,
      profiles (name) as teacher
    `);
  };

  create = async (data: { subject_id: number; classroom_id: number }) => {
    const { error } = await this.client.from("subject_classroom").insert(data);

    if (error) {
      console.error(error);
      return false;
    }

    return true;
  };

  getAll = async () => {
    const { data, error } = await this.client.from("class_subject_teacher")
      .select(`
        subject:subjects (name),
        teacher:profiles (name)
      `);

    if (error) console.error(error);

    return data || [];
  };

  getAllByClassId = async (classId: number) => {
    const { data, error } = await this.client
      .from("class_subject_teacher")
      .select(
        `
        subject:subjects (name),
        teacher:profiles (name)
      `
      )
      .eq("class_id", classId);

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
