import { createClient } from "@/utils/supabase/client";
import React, { FormEvent, useEffect, useState } from "react";
import { TClass, TProfile } from "@/types/public.database.types";

interface Props {
  onClose: () => void;
  onUpdate?: (data: TClass) => void;
  initData?: TClass | null;
}

const supabase = createClient();

function ClassForm({ initData, onClose, onUpdate }: Props) {
  const [teachers, setTeachers] = useState<TProfile[]>([]);
  const [teacherId, setTeacherId] = useState(initData?.teacher_id);

  const createClass = async (data: TClass) => {
    try {
      const { error } = await supabase.from("classes").insert(data);

      if (error) throw error;

      onClose();
    } catch (error) {
      console.error(error, { cause: "Server" });
    }
  };

  const updateClass = async (data: TClass) => {
    try {
      const { error } = await supabase
        .from("classes")
        .update(data)
        .eq("id", initData!.id);

      if (error) throw error;

      onUpdate!({ ...data, id: initData!.id } as TClass);
      onClose();
    } catch (error) {
      console.error(error, { cause: "Server" });
    }
  };

  const getTeachers = async () => {
    try {
      const supabase = createClient();

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("acc_role", "teacher");

      setTeachers(data!);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const formObj = Object.fromEntries(formData) as unknown as TClass;

    if (initData) {
      updateClass(formObj);
    } else {
      createClass(formObj);
    }
  };

  useEffect(() => {
    getTeachers();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg">
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
        <input
          defaultValue={initData?.grade}
          className="bg-slate-500 px-4 py-2 rounded-lg text-white placeholder:text-white"
          type="number"
          name="grade"
          placeholder="Tingkat"
        />
        <input
          defaultValue={initData?.code}
          className="bg-slate-500 px-4 py-2 rounded-lg text-white placeholder:text-white"
          type="text"
          name="code"
          placeholder="Kode kelas"
        />
      </div>

      <div>
        <div className="text-center mt-4 mb-2 font-bold">Tahun ajaran</div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            defaultValue={initData?.academic_year_odd}
            className="bg-slate-500 px-4 py-2 rounded-lg text-white placeholder:text-white"
            type="number"
            name="academic_year_odd"
            placeholder="Ganjil"
          />
          <input
            defaultValue={initData?.academic_year_even}
            className="bg-slate-500 px-4 py-2 rounded-lg text-white placeholder:text-white"
            type="number"
            name="academic_year_even"
            placeholder="Genap"
          />
        </div>
      </div>

      <div>
        <div className="text-center mt-4 mb-2 font-bold">Wali Kelas</div>

        <div className="grid grid-cols-1 gap-4">
          <select
            value={teacherId}
            onChange={(event) => setTeacherId(event.target.value)}
            name="teacher_id"
            className="bg-slate-500 px-4 py-2 rounded-lg text-white placeholder:text-white"
          >
            {teachers.map((teacher) => (
              <option value={teacher.user_id} key={teacher.user_id}>
                {teacher.name} | {teacher.email}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          className="block mx-auto px-6 py-2 bg-green-500 rounded-lg mt-6 text-white w-full"
          type="submit"
        >
          Simpan
        </button>
        <button
          className="block mx-auto px-6 py-2 bg-red-500 rounded-lg mt-6 text-white w-full"
          type="button"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default ClassForm;
