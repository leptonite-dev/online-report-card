"use client";

import { createClient } from "@/utils/supabase/client";
import { QueryData } from "@supabase/supabase-js";
import { roman } from "@ultirequiem/roman";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode, use, useEffect, useState } from "react";

type Params = {
  grade: number;
  code: string;
  odd: number;
  even: number;
};

interface Props {
  children: ReactNode;
  params: Promise<Params>;
}

const supabase = createClient();

const classDataQuery = supabase
  .from("classes")
  .select("*, teacher:teacher_id (name)");

type ClassDataArray = QueryData<typeof classDataQuery>;

type ClassData = ClassDataArray extends Array<infer U> ? U : never;

const ClassLayout = ({ children, params }: Props) => {
  const { grade, code, odd, even } = use(params);
  const pathname = usePathname().split("/").filter(Boolean).pop();
  const [classData, setClassData] = useState<ClassData>();

  useEffect(() => {
    const getClassData = async () => {
      try {
        const { data, error } = await classDataQuery
          .eq("grade", grade)
          .eq("code", code)
          .eq("academic_year_odd", odd)
          .eq("academic_year_even", even);

        if (error) throw error;

        if (data) {
          setClassData(data[0]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getClassData();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-12 gap-2 text-white">
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
        <div className="col-span-10">{classData?.teacher.name}</div>
      </div>

      <div className="flex gap-1 mt-4">
        <Link
          className={clsx(
            "px-4 py-2 rounded-lg transition-colors duration-300 border-2",
            pathname === "students"
              ? "bg-white bg-opacity-70"
              : "hover:bg-white hover:bg-opacity-70 border-2 border-white border-opacity-70 text-white"
          )}
          href="./students"
        >
          Daftar Murid
        </Link>
        <Link
          className={clsx(
            "px-4 py-2 rounded-lg transition-colors duration-300",
            pathname === "report-cards"
              ? "bg-white bg-opacity-70 border-2"
              : "hover:bg-white hover:bg-opacity-70 border-2 border-white border-opacity-70 text-white"
          )}
          href="./report-cards"
        >
          Nilai ujian
        </Link>
      </div>

      <div>{children}</div>
    </div>
  );
};

export default ClassLayout;
