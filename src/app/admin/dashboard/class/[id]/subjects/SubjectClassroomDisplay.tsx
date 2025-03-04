import { CiEdit, CiTrash } from "react-icons/ci";

interface Props {
  classSubjectTeachers: {
    subject: { name: string };
    teacher: { name: string | null };
  }[];
}

function SubjectClassroomDisplay({ classSubjectTeachers }: Props) {
  return (
    <>
      {classSubjectTeachers.map(({ subject, teacher }) => (
        <div
          className="text-gray-900 py-4 [&:not(:last-child)]:border-b border-black grid grid-cols-3 items-center"
          key={`${subject.name}-${teacher.name}`}
        >
          <div>{subject.name}</div>
          <div>{teacher.name}</div>
          <div className="flex justify-end gap-4">
            <button className="bg-slate-500 p-2 rounded-lg">
              <CiEdit className="text-white" size={24} />
            </button>
            <button className="bg-slate-500 p-2 rounded-lg">
              <CiTrash className="text-white" size={24} />
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

export default SubjectClassroomDisplay;
