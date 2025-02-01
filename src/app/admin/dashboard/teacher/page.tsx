"use client";

import TeacherForm from "@/components/forms/TeacherForm";
import Modal from "@/components/Modal";
import { useState } from "react";
import { CiCirclePlus, CiEdit, CiTrash, CiUser } from "react-icons/ci";

type User = {
  id: string;
  name: string;
  nip: string;
  role: "teacher" | "admin";
};

export default function TeacherListPage() {
  const [isAddingTeacher, setIsAddingTeacher] = useState(false);

  return (
    <>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {teacherListData.map((teacher) => (
            <div
              className="bg-white bg-opacity-70 rounded-lg p-4"
              key={teacher.nip}
            >
              <div className="bg-slate-500 rounded-lg aspect-square w-full flex justify-center items-center">
                <CiUser className="text-white" size={256} />
              </div>

              <div className="py-2 flex justify-between mt-4">
                <div>
                  <div className="font-bold">{teacher.name}</div>
                  <div className="text-sm">{teacher.nip}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="bg-slate-500 p-2 rounded-lg">
                    <CiEdit className="text-white" size={24} />
                  </button>
                  <button className="bg-slate-500 p-2 rounded-lg">
                    <CiTrash className="text-white" size={24} />
                  </button>
                </div>
              </div>
            </div>
          ))}
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

const teacherListData: User[] = [
  {
    id: "a",
    name: "Muhammad",
    nip: "0101110000010",
    role: "teacher",
  },
  {
    id: "b",
    name: "Fauzan",
    nip: "010111000001",
    role: "teacher",
  },
  {
    id: "c",
    name: "Azmi",
    nip: "01011100000",
    role: "teacher",
  },
  {
    id: "d",
    name: "Arzaki",
    nip: "0101110000",
    role: "teacher",
  },
];
