import { Student } from "@/lib/data/student";
import { createClient } from "@/utils/supabase/server";

type Params = {
  classId: number;
  subjectId: number;
};

interface Props {
  params: Promise<Params>;
}

const StudentsPage = async ({ params }: Props) => {
  const student = new Student(await createClient());
  const { classId, subjectId } = await params;

  const students = await student.getAllBy([{ col: "class_id", val: classId }]);

  return (
    <div>
      <div className="text-gray-900 grid grid-cols-3 items-center mt-4 bg-white bg-opacity-70 p-4 rounded-t-lg border-b-2 border-black">
        <div className="font-bold">Nama murid</div>
        <div className="font-bold text-center">NIS</div>
        <div className="font-bold text-center">Email wali</div>
      </div>

      <div className="bg-white bg-opacity-70 px-4 rounded-b-lg">
        {students.map(({ id, name, nis, parent_email }) => (
          <div
            className="text-gray-900 py-4 [&:not(:last-child)]:border-b border-black grid grid-cols-3"
            key={id}
          >
            <div>{name}</div>
            <div className="text-center">{nis}</div>
            <div>{parent_email}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentsPage;
