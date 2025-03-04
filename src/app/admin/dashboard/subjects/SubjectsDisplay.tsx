import { Subject } from "@/lib/data/subject";
import { TSubject } from "@/types/public.database.types";
import { createClient } from "@/utils/supabase/client";
import React from "react";
import { CiTrash } from "react-icons/ci";

interface Props {
  subjects: TSubject[];
  onDelete: () => void;
}

const subject = new Subject(createClient());

function SubjectsDisplay({ subjects, onDelete }: Props) {
  const deleteSubject = async (id: number) => {
    const success = await subject.delete(id);

    if (success) {
      onDelete();
    }
  };

  return (
    <>
      {subjects.map(({ id, name }) => (
        <div
          className="bg-white bg-opacity-70 px-4 py-2 rounded-lg font-semibold flex justify-between items-center"
          key={id}
        >
          <span>{name}</span>
          <button
            onClick={() => deleteSubject(id)}
            className="bg-slate-500 p-2 rounded-lg"
          >
            <CiTrash className="text-white" size={24} />
          </button>
        </div>
      ))}
    </>
  );
}

export default SubjectsDisplay;
