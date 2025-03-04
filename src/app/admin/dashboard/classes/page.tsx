"use client";

import ClassForm from "@/components/forms/ClassForm";
import Modal from "@/components/Modal";
import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import ClassesDisplay from "./ClassesDisplay";

export default function ClassListPage() {
  const [isAddingClass, setIsAddingClass] = useState(false);

  return (
    <>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <ClassesDisplay />
        </div>

        <button
          onClick={() => setIsAddingClass(true)}
          className="bg-slate-500 p-2 rounded-lg fixed bottom-4 right-4 shadow-xl"
        >
          <CiCirclePlus className="text-white" size={32} />
        </button>
      </div>

      <Modal isOpen={isAddingClass}>
        <ClassForm onClose={() => setIsAddingClass(false)} />
      </Modal>
    </>
  );
}
