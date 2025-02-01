import React, { FormEvent, ReactNode } from "react";

interface Props {
  onClose: () => void;
}

function ClassForm({ onClose }: Props) {
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
          type="number"
          name="grade"
          placeholder="Tingkat"
        />
        <input
          className="bg-slate-500 px-4 py-2 rounded-lg text-white placeholder:text-white"
          type="text"
          name="code"
          placeholder="Kode kelas"
        />
      </div>

      <div>
        <div className="text-center mt-4 mb-2 font-bold">Tahun ajaran</div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="bg-slate-500 px-4 py-2 rounded-lg text-white placeholder:text-white"
            type="number"
            name="grade"
            placeholder="Ganjil"
          />
          <input
            className="bg-slate-500 px-4 py-2 rounded-lg text-white placeholder:text-white"
            type="number"
            name="grade"
            placeholder="Genap"
          />
        </div>
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
}

export default ClassForm;
