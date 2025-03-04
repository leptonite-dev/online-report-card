"use client";

import { createClient } from "@/utils/supabase/client";
import { roman } from "@ultirequiem/roman";
import { ReactNode, use, useEffect, useState } from "react";
import { QueryData } from "@supabase/supabase-js";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

interface Props {
  params: Promise<URLParams>;
  children: ReactNode;
}

interface URLParams {
  id: number;
}

const supabase = createClient();

const classDataQuery = supabase
  .from("classes")
  .select("*, teacher:teacher_id (name)");

type ClassDataArray = QueryData<typeof classDataQuery>;

type ClassData = ClassDataArray extends Array<infer U> ? U : never;

const navLinks = [
  {
    path: "students",
    name: "Daftar Murid",
  },
  {
    path: "subjects",
    name: "Daftar Mapel",
  },
];

const ClassLayout = ({ params, children }: Props) => {
  const { id: classId } = use(params);
  const [classData, setClassData] = useState<ClassData>();
  const pathname = usePathname().split("/").filter(Boolean).pop();

  useEffect(() => {
    async function getClassData() {
      try {
        const { data, error } = await classDataQuery.eq("id", classId);

        if (error) throw error;

        if (data) {
          setClassData(data[0]);
        }
      } catch (error) {
        console.error(error);
      }
    }

    getClassData();
  }, [classId]);

  return (
    <>
      {classData ? (
        <div className="text-white">
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-2 flex justify-between">
              Kelas <span>:</span>
            </div>
            <div className="col-span-10">
              {roman(classData.grade)} / {classData.code}
            </div>

            <div className="col-span-2 flex justify-between">
              Tahun ajaran <span>:</span>
            </div>
            <div className="col-span-10">
              {classData.academic_year_odd} / {classData.academic_year_even}
            </div>

            <div className="col-span-2 flex justify-between">
              Wali Kelas <span>:</span>
            </div>
            <div className="col-span-10">{classData.teacher.name}</div>
          </div>

          <div className="flex gap-1 mt-4">
            {navLinks.map(({ name, path }, idx) => (
              <Link
                className={clsx(
                  "px-4 py-2 rounded-lg transition-colors duration-300 border-2",
                  pathname === path
                    ? "bg-white bg-opacity-70 text-black"
                    : "hover:bg-white hover:bg-opacity-70 border-2 border-white border-opacity-70 text-white"
                )}
                href={path}
                key={idx}
              >
                {name}
              </Link>
            ))}
          </div>

          {children}
        </div>
      ) : (
        <div className="text-white text-center">Data tidak ditemukan</div>
      )}
    </>
  );
};

export default ClassLayout;
