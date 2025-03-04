import { createClient } from "@/utils/supabase/client";
import { FormEvent } from "react";
import { TClass, TSubject } from "@/types/public.database.types";
import { Subject } from "@/lib/data/subject";

interface Props {
  initData?: TClass | null;
  onSuccess?: () => void;
  onClose: () => void;
}

const subject = new Subject(createClient());

function SubjectForm({ initData, onClose, onSuccess = () => {} }: Props) {
  const createSubject = async (data: Omit<TSubject, "id" | "created_at">) => {
    const success = await subject.create(data);

    if (success) {
      onSuccess();
      onClose();
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const formObj = Object.fromEntries(formData) as unknown as Omit<
      TSubject,
      "id" | "created_at"
    >;

    createSubject(formObj);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg">
      <div>
        <input
          defaultValue={initData?.grade}
          className="bg-slate-500 px-4 py-2 rounded-lg text-white placeholder:text-white"
          type="text"
          name="name"
          placeholder="Nama Mapel"
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
}

export default SubjectForm;
