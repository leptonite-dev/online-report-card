"use client";

import { roman } from "@ultirequiem/roman";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode, use } from "react";

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

const ClassLayout = ({ children, params }: Props) => {
  const { grade, code, odd, even } = use(params);
  const pathname = usePathname().split("/").filter(Boolean).pop();

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
        <div className="col-span-10">Muhammad Fauzan Azmi Arzaki</div>

        <div className="col-span-2 flex justify-between">
          Murid <span>:</span>
        </div>
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
