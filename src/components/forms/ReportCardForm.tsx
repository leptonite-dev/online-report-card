"use client";

import { Student } from "@/types/global";
import React, { ChangeEvent, FormEvent, useState } from "react";

interface Props {
  onClose: () => void;
}

const ReportCardForm = ({ onClose }: Props) => {
  const [studentScores, setStudentScores] = useState(
    studentListData.map(({ name, nis }) => ({ name, nis, score: "" }))
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleChangeStudentScore = (idx: number) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      const newStudentScores = [...studentScores];
      newStudentScores[idx].score = event.target.value;
      setStudentScores(newStudentScores);
    };
  };

  return (
    <form
      className="w-full h-full bg-white rounded-xl px-4 overflow-auto"
      onSubmit={handleSubmit}
    >
      <div className="sticky top-0 py-4 bg-white">
        <div className="bg-slate-500 text-white grid grid-cols-3 items-center p-4 rounded-lg">
          <div className="font-bold text-center">Nama murid</div>
          <div className="font-bold text-center">NIS</div>
          <div className="font-bold text-center">Nilai</div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {studentScores.map((studentScore, idx) => (
          <div className="grid grid-cols-3 gap-4" key={idx}>
            <div className="bg-slate-500 px-4 py-2 rounded-lg text-white placeholder:text-white">
              {studentScore.name}
            </div>
            <div className="bg-slate-500 px-4 py-2 rounded-lg text-white placeholder:text-white">
              {studentScore.nis}
            </div>
            <input
              className="bg-slate-500 px-4 py-2 rounded-lg text-white placeholder:text-white"
              value={studentScore.score}
              onChange={(event) => handleChangeStudentScore(idx)(event)}
              type="number"
              name="score"
              placeholder="Nilai"
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4 sticky bottom-0 bg-white py-4">
        <button
          className="block mx-auto px-6 py-2 bg-green-500 rounded-lg text-white w-full"
          type="submit"
        >
          Simpan
        </button>
        <button
          className="block mx-auto px-6 py-2 bg-green-500 rounded-lg text-white w-full"
          type="submit"
        >
          Simpan dan Kirim
        </button>
        <button
          className="block mx-auto px-6 py-2 bg-red-500 rounded-lg text-white w-full"
          type="button"
          onClick={onClose}
        >
          Batal
        </button>
      </div>
    </form>
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

export default ReportCardForm;
