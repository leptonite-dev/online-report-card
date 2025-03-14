import { FormEvent, useEffect, useState } from "react";
import {
  TClassSubjectTeacher,
  TProfile,
  TSubject,
} from "@/types/public.database.types";
import { createClient } from "@/utils/supabase/client";
import { Profile } from "@/lib/data/profile";
import { Subject } from "@/lib/data/subject";
import { ClassSubjectTeacher } from "@/lib/data/classSubjectTeacher";

interface Props {
  initData?: TClassSubjectTeacher;
  classId: number;
  onClose: () => void;
  onSuccess?: () => void;
}

const profile = new Profile(createClient());
const subject = new Subject(createClient());
const classSubjectTeacher = new ClassSubjectTeacher(createClient());

const ClassSubjectTeacherForm = ({
  initData,
  classId,
  onSuccess = () => {},
  onClose,
}: Props) => {
  const [teacherId, setTeacherId] = useState("");
  const [subjectId, setSubjectId] = useState<number>();
  const [teachers, setTeachers] = useState<TProfile[]>([]);
  const [subjects, setSubjects] = useState<TSubject[]>([]);

  const createClassSubjectTeacher = async (
    classId: number,
    subjectId: number,
    teacherId: string
  ) => {
    const success = await classSubjectTeacher.create({
      class_id: classId,
      subject_id: subjectId,
      teacher_id: teacherId,
    });

    if (success) {
      onSuccess();
      onClose();
    }
  };

  const updateClassSubjectTeacher = async (data: TClassSubjectTeacher) => {
    const success = await classSubjectTeacher.update(data);

    if (!success) {
      alert("Tidak dapat mengubah data");
    }

    onClose();
  };

  const getTeachers = async () => {
    setTeachers(await profile.getAllTeachers());
  };

  const getSubjects = async () => {
    setSubjects(await subject.getAll());
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!subjectId || teacherId === "") {
      alert("Tolong isi data dengan benar");
      return;
    }

    const formData = new FormData(event.target as HTMLFormElement);
    const formObj = Object.fromEntries(formData) as unknown as {
      name: string;
      teacher_id: string;
    };

    console.log(formObj);

    if (initData) {
      updateClassSubjectTeacher({ ...initData, ...formObj });
    } else {
      createClassSubjectTeacher(classId, subjectId, teacherId);
    }
  };

  useEffect(() => {
    getTeachers();
    getSubjects();
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-lg grid grid-cols-1 gap-2 "
    >
      <div className="grid grid-cols-2 gap-4 items-center">
        <div className="font-bold">Mata Pelajaran</div>
        <select
          defaultValue="default"
          onChange={(event) => setSubjectId(parseInt(event.target.value))}
          name="subject_id"
          className="bg-slate-500 px-4 py-2 rounded-lg text-white placeholder:text-white"
        >
          <option value="default" disabled className="disabled:text-white">
            Nama Mata Pelajaran
          </option>
          {subjects.map((subject) => (
            <option value={subject.id} key={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4 items-center">
        <div className="font-bold">Guru</div>
        <select
          defaultValue="default"
          onChange={(event) => setTeacherId(event.target.value)}
          name="teacher_id"
          className="bg-slate-500 px-4 py-2 rounded-lg text-white placeholder:text-white"
        >
          <option value="default" disabled className="disabled:text-white">
            Nama Guru
          </option>
          {teachers.map((teacher) => (
            <option value={teacher.user_id} key={teacher.user_id}>
              {teacher.name} | {teacher.email}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <button
          className="block mx-auto px-6 py-2 bg-green-500 rounded-lg mt-6 text-white w-full"
          type="submit"
        >
          Simpan
        </button>
        <button
          className="block mx-auto px-6 py-2 bg-red-500 rounded-lg mt-6 text-white w-full"
          type="button"
          onClick={onClose}
        >
          Batal
        </button>
      </div>
    </form>
  );
};

export default ClassSubjectTeacherForm;
