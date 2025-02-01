import { Student } from "@/types/global";

const StudentsPage = async () => {
  return (
    <div>
      <div className="text-gray-900 grid grid-cols-3 items-center mt-4 bg-white bg-opacity-70 p-4 rounded-t-lg border-b-2 border-black">
        <div className="font-bold">Nama murid</div>
        <div className="font-bold text-center">NIS</div>
        <div className="font-bold text-center">Email wali</div>
      </div>

      <div className="bg-white bg-opacity-70 px-4 rounded-b-lg">
        {studentListData.map(({ id, name, nis, parentEmail }) => (
          <div
            className="text-gray-900 py-4 [&:not(:last-child)]:border-b border-black grid grid-cols-3"
            key={id}
          >
            <div>{name}</div>
            <div className="text-center">{nis}</div>
            <div>{parentEmail}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const studentListData: Student[] = [
  {
    id: "a",
    name: "Muhammad",
    nis: 111,
    parentEmail: "azmiarzaki@gmail.com",
  },
  {
    id: "b",
    name: "Fauzan",
    nis: 222,
    parentEmail: "azmiarzaki@gmail.com",
  },
  {
    id: "c",
    name: "Azmi",
    nis: 333,
    parentEmail: "azmiarzaki@gmail.com",
  },
  {
    id: "d",
    name: "Arzaki",
    nis: 444,
    parentEmail: "azmiarzaki@gmail.com",
  },
];

export default StudentsPage;
