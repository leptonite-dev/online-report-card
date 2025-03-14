import { TClassSubjectTeacherResponse } from "@/lib/data/classSubjectTeacher";
import { TClassSubjectTeacher } from "@/types/public.database.types";
import { CiTrash } from "react-icons/ci";

interface Props {
  classSubjectTeachers: TClassSubjectTeacherResponse[];
  handleDelete: (data: TClassSubjectTeacher) => void;
}

function SubjectClassroomDisplay({
  classSubjectTeachers,
  handleDelete,
}: Props) {
  return (
    <>
      {classSubjectTeachers.map(({ classroom, subject, teacher }) => (
        <div
          className="text-gray-900 py-4 [&:not(:last-child)]:border-b border-black grid grid-cols-3 items-center"
          key={`${subject.name}-${teacher.name}`}
        >
          <div>{subject.name}</div>
          <div>{teacher.name}</div>
          <div className="flex justify-end gap-4">
            <button
              onClick={() =>
                handleDelete({
                  class_id: classroom.id,
                  subject_id: subject.id,
                  teacher_id: teacher.id,
                })
              }
              className="bg-slate-500 p-2 rounded-lg"
            >
              <CiTrash className="text-white" size={24} />
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

export default SubjectClassroomDisplay;
