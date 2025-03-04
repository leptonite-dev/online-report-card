"use client";

import { use, useEffect, useState } from "react";
import StudentForm from "@/components/forms/StudentForm";
import Modal from "@/components/Modal";
import StudentsDisplay from "./StudentsDisplay";
import { CiCirclePlus } from "react-icons/ci";
import { TStudent } from "@/types/public.database.types";
import { Student } from "@/lib/data/student";
import { createClient } from "@/utils/supabase/client";

interface Props {
  params: Promise<{ id: number }>;
}

const student = new Student(createClient());

function StudentsPage({ params }: Props) {
  const { id: classId } = use(params);
  const [students, setStudents] = useState<TStudent[]>([]);
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [isEditting, setIsEditting] = useState({ value: false, data: null });

  const refreshStudents = async () => {
    setStudents(await student.getByClassId(classId));
  };

  useEffect(() => {
    const getStudents = async () => {
      setStudents(await student.getByClassId(classId));
    };

    getStudents();
  }, [students]);

  return (
    <>
      <div className="text-gray-900 grid grid-cols-4 items-center mt-4 bg-white bg-opacity-70 p-4 rounded-t-lg border-b-2 border-black">
        <div className="font-bold">Nama murid</div>
        <div className="font-bold">NIS</div>
        <div className="font-bold">Email wali murid</div>
        <div className="flex justify-end">
          <button
            onClick={() => setIsAddingStudent(true)}
            className="bg-slate-500 p-2 rounded-lg"
          >
            <CiCirclePlus className="text-white" size={24} />
          </button>
        </div>
      </div>

      <div className="bg-white bg-opacity-70 px-4 rounded-b-lg">
        <StudentsDisplay
          students={students}
          handleEdit={() => setIsEditting({ value: true, data: null })}
        />
      </div>

      <Modal isOpen={isAddingStudent || isEditting.value}>
        <StudentForm
          classId={classId}
          initData={isEditting.data}
          onCreate={refreshStudents}
          onClose={() => setIsAddingStudent(false)}
        />
      </Modal>
    </>
  );
}

export default StudentsPage;
