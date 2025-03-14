"use client";

import { ClassRoom, TClassRoomResponse } from "@/lib/data/classRoom";
import { createClient } from "@/utils/supabase/client";
import { roman } from "@ultirequiem/roman";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, use, useEffect, useState } from "react";

type Params = {
  classId: number;
  subjectId: number;
};

interface Props {
  children: ReactNode;
  params: Promise<Params>;
}

const client = createClient();
const classRoom = new ClassRoom(client);

const ClassLayout = ({ children, params }: Props) => {
  const { classId, subjectId } = use(params);
  const pathname = usePathname().split("/").filter(Boolean).pop();
  const [classRoomData, setClassRoomData] = useState<TClassRoomResponse>();

  useEffect(() => {
    const getClassRoomData = async () => {
      setClassRoomData(await classRoom.getBy([{ col: "id", val: classId }]));
    };

    getClassRoomData();
  }, []);

  return classRoomData ? (
    <div>
      <div className="grid grid-cols-12 gap-2 text-white">
        <div className="col-span-2 flex justify-between">
          Kelas <span>:</span>
        </div>
        <div className="col-span-10">
          {roman(classRoomData.grade)} / {classRoomData.code}
        </div>

        <div className="col-span-2 flex justify-between">
          Tahun ajaran <span>:</span>
        </div>
        <div className="col-span-10">
          {classRoomData.academic_year_odd} / {classRoomData.academic_year_even}
        </div>

        <div className="col-span-2 flex justify-between">
          Wali kelas <span>:</span>
        </div>
        <div className="col-span-10">{classRoomData.teacher.name}</div>
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
  ) : null;
};

export default ClassLayout;
