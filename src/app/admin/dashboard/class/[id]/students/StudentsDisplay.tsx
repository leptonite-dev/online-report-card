import { TStudent } from "@/types/public.database.types";
import { CiEdit, CiTrash } from "react-icons/ci";

interface Props {
  students: TStudent[];
  handleEdit: () => void;
}

function StudentsDisplay({ students, handleEdit }: Props) {
  return (
    <>
      {students.map(({ id, name, nis, parent_email }) => (
        <div
          className="text-gray-900 py-4 [&:not(:last-child)]:border-b border-black grid grid-cols-4"
          key={id}
        >
          <div>{name}</div>
          <div>{nis}</div>
          <div>{parent_email}</div>
          <div className="flex justify-end gap-4">
            <button
              onClick={handleEdit}
              className="bg-slate-500 p-2 rounded-lg"
            >
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

export default StudentsDisplay;
