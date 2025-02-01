"use client";

import { ClassRoom } from "@/types/global";
import { roman } from "@ultirequiem/roman";
import Link from "next/link";
import React from "react";
import { CiEdit, CiTrash } from "react-icons/ci";
import { MdOutlineClass } from "react-icons/md";

const ClassesPage = () => {
  return (
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
    </div>
  );
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

export default ClassesPage;
