"use client";

import TeacherForm from "@/components/forms/TeacherForm";
import Modal from "@/components/Modal";
import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import TeachersDisplay from "./TeachersDisplay";

export default function TeacherListPage() {
  const [isAddingTeacher, setIsAddingTeacher] = useState(false);

  return (
    <>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <TeachersDisplay />
        </div>

        <button
          onClick={() => setIsAddingTeacher(true)}
          className="bg-slate-500 p-2 rounded-lg fixed bottom-4 right-4 shadow-xl"
        >
          <CiCirclePlus className="text-white" size={32} />
        </button>
      </div>

      <Modal isOpen={isAddingTeacher}>
        <TeacherForm onClose={() => setIsAddingTeacher(false)} />
      </Modal>
    </>
  );
}
