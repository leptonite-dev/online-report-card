"use client";

import { createClient } from "@/utils/supabase/client";
import { roman } from "@ultirequiem/roman";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdOutlineClass } from "react-icons/md";
import { TClass } from "@/types/public.database.types";

const supabase = createClient();

const ClassesPage = () => {
  const [classes, setClasses] = useState<TClass[]>();

  const getClasses = async () => {
    try {
      const { data: user, error: authError } = await supabase.auth.getUser();

      if (authError) throw authError;

      if (!user) return;

      const { data, error } = await supabase
        .from("classes")
        .select("*")
        .eq("teacher_id", user.user.id);

      if (error) throw error;

      if (data) {
        setClasses(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getClasses();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {classes &&
          classes.map(
            ({ id, grade, code, academic_year_odd, academic_year_even }) => (
              <Link
                onClick={(event) => {
                  if (event.target instanceof HTMLButtonElement) {
                    event.preventDefault();
                  }
                }}
                href={`class/${grade}/${code}/${academic_year_odd}/${academic_year_even}`}
                className="bg-white bg-opacity-70 rounded-lg p-4 cursor-pointer"
                key={id}
              >
                <div className="bg-slate-500 rounded-lg aspect-square w-full flex justify-center items-center">
                  <MdOutlineClass
                    className="text-white opacity-70"
                    size={256}
                  />
                </div>

                <div className="py-2 flex justify-between mt-4">
                  <div>
                    <div className="font-bold">
                      {roman(grade)} / {code}
                    </div>
                    <div>
                      <span className="font-bold">TA: </span>
                      {academic_year_odd} / {academic_year_even}
                    </div>
                  </div>
                </div>
              </Link>
            )
          )}
      </div>
    </div>
  );
};

export default ClassesPage;
