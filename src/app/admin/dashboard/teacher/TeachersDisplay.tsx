"use client"

import { useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";
import { createClient } from "@/utils/supabase/client";
import { TProfile } from "@/types/public.database.types";

function TeachersDisplay() {
  const [teachers, setTeachers] = useState<TProfile[]>([]);

  const getTeachers = async () => {
    const supabase = createClient();

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("acc_role", "teacher")
      .neq("name", "");

    if (data) setTeachers(data);
  };

  useEffect(() => {
    getTeachers();
  }, []);

  return (
    <>
      {teachers!.map((teacher) => (
        <div className="bg-white bg-opacity-70 rounded-lg p-4" key={teacher.id}>
          <div className="bg-slate-500 rounded-lg aspect-square w-full flex justify-center items-center">
            <CiUser className="text-white" size={256} />
          </div>

          <div className="py-2 flex justify-between mt-4">
            <div>
              <div className="font-bold">{teacher.name}</div>
              <div className="text-sm">{teacher.email}</div>
            </div>
            {/* <div className="flex items-center gap-2">
              <button className="bg-slate-500 p-2 rounded-lg">
                <CiEdit className="text-white" size={24} />
              </button>
              <button className="bg-slate-500 p-2 rounded-lg">
                <CiTrash className="text-white" size={24} />
              </button>
            </div> */}
          </div>
        </div>
      ))}
    </>
  );
}

export default TeachersDisplay;
