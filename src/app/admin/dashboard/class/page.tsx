"use client";

import ClassForm from "@/components/forms/ClassForm";
import Modal from "@/components/Modal";
import { roman } from "@ultirequiem/roman";
import Link from "next/link";
import { useState } from "react";
import { CiCirclePlus, CiEdit, CiTrash } from "react-icons/ci";
import { MdOutlineClass } from "react-icons/md";

export default function ClassListPage() {
  const [isAddingClass, setIsAddingClass] = useState(false);

  return (
    <>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {classListData.map(({ id, grade, code, academicYear }) => (
            <Link
              onClick={(event) => {
                if (event.target instanceof HTMLButtonElement) {
                  event.preventDefault();
                }
              }}
              href={`class/${grade}/${code}/${academicYear.odd}/${academicYear.even}`}
              className="bg-white bg-opacity-70 rounded-lg p-4 cursor-pointer"
              key={id}
            >
              <div className="bg-slate-500 rounded-lg aspect-square w-full flex justify-center items-center">
                <MdOutlineClass className="text-white opacity-70" size={256} />
              </div>

              <div className="py-2 flex justify-between mt-4">
                <div>
                  <div className="font-bold">
                    {roman(grade)} / {code}
                  </div>
                  <div>
                    <span className="font-bold">TA: </span>
                    {academicYear.odd} / {academicYear.even}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => console.log("Editing")}
                    className="bg-slate-500 p-2 rounded-lg"
                  >
                    <CiEdit
                      className="text-white pointer-events-none"
                      size={24}
                    />
                  </button>
                  <button className="bg-slate-500 p-2 rounded-lg">
                    <CiTrash
                      className="text-white pointer-events-none"
                      size={24}
                    />
                  </button>
                </div>
              </div>
            </Link>
          ))}
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

type ClassRoom = {
  id: string;
  grade: number;
  code: string;
  academicYear: {
    odd: number;
    even: number;
  };
};

const classListData: ClassRoom[] = [
  {
    id: "a",
    grade: 1,
    code: "A",
    academicYear: {
      odd: 2010,
      even: 2011,
    },
  },
  {
    id: "b",
    grade: 1,
    code: "B",
    academicYear: {
      odd: 2010,
      even: 2011,
    },
  },
  {
    id: "c",
    grade: 2,
    code: "A",
    academicYear: {
      odd: 2010,
      even: 2011,
    },
  },
  {
    id: "d",
    grade: 3,
    code: "A",
    academicYear: {
      odd: 2010,
      even: 2011,
    },
  },
];
