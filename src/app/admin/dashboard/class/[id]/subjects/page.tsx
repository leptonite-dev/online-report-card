"use client";

import { use, useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import SubjectClassroomDisplay from "./SubjectClassroomDisplay";
import Modal from "@/components/Modal";
import ClassSubjectTeacherForm from "@/components/forms/ClassSubjectTeacherForm";
import { createClient } from "@/utils/supabase/client";
import {
  ClassSubjectTeacher,
  TClassSubjectTeacherResponse,
} from "@/lib/data/classSubjectTeacher";
import { TClassSubjectTeacher } from "@/types/public.database.types";

interface Props {
  params: Promise<{ id: number }>;
}

const classSubjectTeacher = new ClassSubjectTeacher(createClient());

function SubjectsPage({ params }: Props) {
  const { id } = use(params);
  const [isAddingSubject, setIsAddingSubject] = useState(false);
  const [classSubjectTeachers, setClassSubjectTeachers] = useState<
    TClassSubjectTeacherResponse[]
  >([]);

  useEffect(() => {
    const getSubjectClassrooms = async () => {
      setClassSubjectTeachers(await classSubjectTeacher.getAllByClassId(id));
    };

    getSubjectClassrooms();
  }, [classSubjectTeachers]);

  return (
    <>
      <div className="text-gray-900 grid grid-cols-3 items-center mt-4 bg-white bg-opacity-70 p-4 rounded-t-lg border-b-2 border-black">
        <div className="font-bold">Mata Pelajaran</div>
        <div className="font-bold">Guru Mapel</div>
        <div className="flex justify-end">
          <button
            onClick={() => setIsAddingSubject(true)}
            className="bg-slate-500 p-2 rounded-lg"
          >
            <CiCirclePlus className="text-white" size={24} />
          </button>
        </div>
      </div>

      <div className="bg-white bg-opacity-70 px-4 rounded-b-lg">
        <SubjectClassroomDisplay
          classSubjectTeachers={classSubjectTeachers}
          handleDelete={async (data) => {
            console.log("Deleting");
            const success = await classSubjectTeacher.delete(data);
            console.log(success);

            setClassSubjectTeachers(
              await classSubjectTeacher.getAllByClassId(id)
            );
          }}
        />
      </div>

      <Modal isOpen={isAddingSubject}>
        <ClassSubjectTeacherForm
          classId={id}
          onSuccess={() => {}}
          onClose={() => setIsAddingSubject(false)}
        />
      </Modal>
    </>
  );
}

export default SubjectsPage;
