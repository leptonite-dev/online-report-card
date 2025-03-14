import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/database.types";
import { TClassSubjectTeacher } from "@/types/public.database.types";

export type TClassSubjectTeacherResponse = {
  classroom: {
    academic_year_even: number;
    academic_year_odd: number;
    code: string;
    created_at: string;
    grade: number;
    id: number;
    teacher_id: string;
  };
  subject: {
    id: number;
    name: string;
  };
  teacher: {
    id: string;
    name: string | null;
  };
};

export class ClassSubjectTeacher {
  client: SupabaseClient<Database>;

  constructor(client: SupabaseClient<Database>) {
    this.client = client;
  }

  table = () => {
    return this.client.from("class_subject_teacher");
  };

  query = () => {
    return this.client.from("class_subject_teacher").select(`
      subject: subjects (name),
      teacher: profiles (name)
    `);
  };

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

  getAllByClassId = async (id: number) => {
    const { data, error } = await this.table()
      .select(
        `
          classroom: classes (*),
          subject: subjects (id, name),
          teacher: profiles (id: user_id, name)
        `
      )
      .eq("class_id", id);

    if (error) console.error(error);

    return data || [];
  };

  async getAllBy(where: { col: string; val: number | string }[]) {
    let query = this.table().select();

    where.forEach(({ col, val }) => {
      query = query.eq(col, val);
    });

    const { data, error } = await query.select(
      "classroom: classes (*), subject: subjects (id, name), teacher: profiles (id: user_id, name)"
    );

    if (error) console.error("Cannot get class subject teachers", error);

    return data || [];
  }

  update = async ({
    class_id,
    subject_id,
    teacher_id,
  }: TClassSubjectTeacher) => {
    const { error } = await this.table()
      .update({
        teacher_id,
      })
      .eq("class_id", class_id)
      .eq("subject_id", subject_id);

    if (error) {
      console.error(error);
      return false;
    }

    return true;
  };

  delete = async ({
    class_id,
    subject_id,
    teacher_id,
  }: TClassSubjectTeacher) => {
    console.log(class_id, subject_id, teacher_id);
    const { error } = await this.table()
      .delete()
      .eq("class_id", class_id)
      .eq("subject_id", subject_id)
      .eq("teacher_id", teacher_id);

    if (error) {
      console.error("Cannot delete class subject teacher", error);
      return false;
    }

    return true;
  };
}
