"use client";

import SubjectForm from "@/components/forms/SubjectForm";
import Modal from "@/components/Modal";
import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import SubjectsDisplay from "./SubjectsDisplay";
import { TSubject } from "@/types/public.database.types";
import { Subject } from "@/lib/data/subject";
import { createClient } from "@/utils/supabase/client";

const subject = new Subject(createClient());

function SubjectsPage() {
  const [subjects, setSubjects] = useState<TSubject[]>([]);
  const [isAddingSubject, setIsAddingSubject] = useState(false);

  const getSubjects = async () => {
    setSubjects(await subject.getAll());
  };

  const refreshSUbjects = () => {
    getSubjects();
  };

  useEffect(() => {
    getSubjects();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4">
        <SubjectsDisplay onDelete={refreshSUbjects} subjects={subjects} />
      </div>

      <button
        onClick={() => setIsAddingSubject(true)}
        className="bg-slate-500 p-2 rounded-lg fixed bottom-4 right-4 shadow-xl"
      >
        <CiCirclePlus className="text-white" size={32} />
      </button>

      <Modal isOpen={isAddingSubject}>
        <SubjectForm
          onSuccess={refreshSUbjects}
          onClose={() => setIsAddingSubject(false)}
        />
      </Modal>
    </>
  );
}

export default SubjectsPage;
