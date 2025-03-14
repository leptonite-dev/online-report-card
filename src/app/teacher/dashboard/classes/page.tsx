"use client";

import { createClient } from "@/utils/supabase/client";
import { roman } from "@ultirequiem/roman";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdOutlineClass } from "react-icons/md";
import {
  ClassSubjectTeacher,
  TClassSubjectTeacherResponse,
} from "@/lib/data/classSubjectTeacher";

const client = createClient();
const classSubjectTeacher = new ClassSubjectTeacher(client);

const ClassesPage = () => {
  const [classes, setClasses] = useState<TClassSubjectTeacherResponse[]>();

  useEffect(() => {
    async function getClasses() {
      setClasses(
        await classSubjectTeacher.getAllBy([
          {
            col: "teacher_id",
            val: (await client.auth.getUser()).data.user!.id,
          },
        ])
      );
    }

    getClasses();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {classes &&
          classes.map(({ classroom, subject, teacher }) => (
            <Link
              onClick={(event) => {
                if (event.target instanceof HTMLButtonElement) {
                  event.preventDefault();
                }
              }}
              href={`class/${classroom.id}/subject/${subject.id}`}
              className="bg-white bg-opacity-70 rounded-lg p-4 cursor-pointer"
              key={`${classroom.id}|${subject.id}`}
            >
              <div className="bg-slate-500 rounded-lg aspect-square w-full flex justify-center items-center">
                <MdOutlineClass className="text-white opacity-70" size={256} />
              </div>

              <div className="py-2 mt-4 flex flex-col gap-y-3">
                <div className="flex justify-between font-bold w-full">
                  <div>{subject.name}</div>
                  <div className="font-bold">
                    {roman(classroom.grade)} / {classroom.code}
                  </div>
                </div>
                <div>
                  <span className="font-bold">TA: </span>
                  {classroom.academic_year_odd} / {classroom.academic_year_even}
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default ClassesPage;
