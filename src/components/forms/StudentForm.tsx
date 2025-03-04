import { createClient } from "@/utils/supabase/client";
import { FormEvent } from "react";
import { TStudent } from "@/types/public.database.types";
import { Student } from "@/lib/data/student";

interface Props {
  initData?: TStudent | null;
  classId: number;
  onClose: () => void;
  onCreate: () => void;
}

const student = new Student(createClient());

const StudentForm = ({ initData, classId, onCreate, onClose }: Props) => {
  const createStudent = async (data: Omit<TStudent, "id" | "created_at">) => {
    const success = await student.create({ ...data, class_id: classId });

    if (success) {
      onCreate();
      onClose();
    }
  };

  const updateStudent = async (data: TStudent) => {
    const success = await student.update(data);

    if (success) {
      onCreate();
      onClose();
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const formObj = Object.fromEntries(formData) as unknown as Omit<
      TStudent,
      "id" | "created_at"
    >;

    if (initData) {
      updateStudent({ ...initData, ...formObj });
    } else {
      createStudent(formObj);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg">
      <div className="grid grid-cols-3 gap-4">
        <input
          className="bg-slate-500 px-4 py-2 rounded-lg text-white placeholder:text-white"
          type="text"
          name="name"
          placeholder="Nama murid"
        />
        <input
          className="bg-slate-500 px-4 py-2 rounded-lg text-white placeholder:text-white"
          type="text"
          name="nis"
          placeholder="NIS"
        />
        <input
          className="bg-slate-500 px-4 py-2 rounded-lg text-white placeholder:text-white"
          type="text"
          name="parent_email"
          placeholder="Email wali murid"
        />
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
          Batal
        </button>
      </div>
    </form>
  );
};

export default StudentForm;
