import React, { FormEvent } from "react";

interface Props {
  onClose: () => void;
}

const StudentForm = ({ onClose }: Props) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const formObj = Object.fromEntries(formData);

    console.log(formObj);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg">
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
        <input
          className="bg-slate-500 px-4 py-2 rounded-lg text-white placeholder:text-white"
          type="text"
          name="name"
          placeholder="Nama murid"
        />
        <input
          className="bg-slate-500 px-4 py-2 rounded-lg text-white placeholder:text-white"
          type="text"
          name="parentEmail"
          placeholder="Email wali"
        />
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
          Cancel
        </button>
      </div>
    </form>
  );
};

export default StudentForm;
