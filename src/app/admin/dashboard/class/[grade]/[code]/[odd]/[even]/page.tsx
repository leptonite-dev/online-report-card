"use client";

import StudentForm from "@/components/forms/StudentForm";
import Modal from "@/components/Modal";
import { roman } from "@ultirequiem/roman";
import React, { use, useState } from "react";
import { CiEdit, CiTrash, CiCirclePlus } from "react-icons/ci";

interface Props {
  params: Promise<URLParams>;
}

interface URLParams {
  grade: number;
  code: string;
  odd: number;
  even: number;
}

const ClassPage = ({ params }: Props) => {
  const { grade, code, odd, even } = use(params);
  const [isAddingStudent, setIsAddingStudent] = useState(false);

  return (
    <>
      <div className="text-white">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-2 flex justify-between">
            Kelas <span>:</span>
          </div>
          <div className="col-span-10">
            {roman(grade)} / {code}
          </div>

          <div className="col-span-2 flex justify-between">
            Tahun ajaran <span>:</span>
          </div>
          <div className="col-span-10">
            {odd} / {even}
          </div>

          <div className="col-span-2 flex justify-between">
            Guru <span>:</span>
          </div>
          <div className="col-span-10">Muhammad Fauzan Azmi Arzaki</div>

          <div className="col-span-2 flex justify-between">
            Murid <span>:</span>
          </div>
        </div>

        <div className="text-gray-900 grid grid-cols-3 items-center mt-4 bg-white bg-opacity-70 p-4 rounded-t-lg border-b-2 border-black">
          <div className="font-bold">Nama murid</div>
          <div className="font-bold">Email wali</div>
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
          {studentListData.map(({ id, name, parentEmail }) => (
            <div
              className="text-gray-900 py-4 [&:not(:last-child)]:border-b border-black grid grid-cols-3"
              key={id}
            >
              <div>{name}</div>
              <div>{parentEmail}</div>
              <div className="flex justify-end gap-4">
                <button className="bg-slate-500 p-2 rounded-lg">
                  <CiEdit className="text-white" size={24} />
                </button>
                <button className="bg-slate-500 p-2 rounded-lg">
                  <CiTrash className="text-white" size={24} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={isAddingStudent}>
        <StudentForm onClose={() => setIsAddingStudent(false)} />
      </Modal>
    </>
  );
};

type Student = {
  id: string;
  name: string;
  parentEmail: string;
};

const studentListData: Student[] = [
  {
    id: "a",
    name: "Muhammad",
    parentEmail: "azmiarzaki@gmail.com",
  },
  {
    id: "b",
    name: "Fauzan",
    parentEmail: "azmiarzaki@gmail.com",
  },
  {
    id: "c",
    name: "Azmi",
    parentEmail: "azmiarzaki@gmail.com",
  },
  {
    id: "d",
    name: "Arzaki",
    parentEmail: "azmiarzaki@gmail.com",
  },
];

export default ClassPage;
