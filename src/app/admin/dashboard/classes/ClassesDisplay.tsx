import React, { useEffect, useState } from "react";
import { TClass } from "@/types/public.database.types";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { MdOutlineClass } from "react-icons/md";
import { roman } from "@ultirequiem/roman";
import { CiEdit, CiTrash } from "react-icons/ci";
import Modal from "@/components/Modal";
import ClassForm from "@/components/forms/ClassForm";
import { ClassRoom } from "@/lib/data/classRoom";

const classRoom = new ClassRoom(createClient());

function ClassesDisplay() {
  const [classes, setClasses] = useState<TClass[]>([]);

  const [isEdittingClass, setIsEdittingClass] = useState<{
    value: boolean;
    data: TClass | null;
  }>({
    value: false,
    data: null,
  });

  const getClasses = async () => {
    const data = await classRoom.getAll();

    setClasses(data);
  };

  const deleteClass = async (id: number) => {
    const success = await classRoom.delete(id);

    if (success) {
      setClasses(classes.filter((classData) => classData.id !== id));
    }
  };

  const handleUpdate = (data: TClass) => {
    setClasses(
      classes.map((classData) => {
        if (classData.id === data.id) {
          return data;
        }

        return classData;
      })
    );
  };

  useEffect(() => {
    getClasses();
  }, []);

  return (
    <>
      {classes.map((classData) => {
        const { id, grade, code, academic_year_odd, academic_year_even } =
          classData;
        return (
          <Link
            onClick={(event) => {
              if (event.target instanceof HTMLButtonElement) {
                event.preventDefault();
              }
            }}
            href={`class/${id}`}
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
                  {academic_year_odd} / {academic_year_even}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setIsEdittingClass({
                      value: true,
                      data: classData,
                    })
                  }
                  className="bg-slate-500 p-2 rounded-lg"
                >
                  <CiEdit
                    className="text-white pointer-events-none"
                    size={24}
                  />
                </button>
                <button
                  onClick={() => deleteClass(id)}
                  className="bg-slate-500 p-2 rounded-lg"
                >
                  <CiTrash
                    className="text-white pointer-events-none"
                    size={24}
                  />
                </button>
              </div>
            </div>
          </Link>
        );
      })}

      <Modal isOpen={isEdittingClass.value}>
        <ClassForm
          initData={isEdittingClass.data}
          onUpdate={handleUpdate}
          onClose={() =>
            setIsEdittingClass({
              value: false,
              data: null,
            })
          }
        />
      </Modal>
    </>
  );
}

export default ClassesDisplay;
