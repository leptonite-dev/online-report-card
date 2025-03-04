import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import React, { FormEvent } from "react";

interface Props {
  onClose: () => void;
}

function TeacherForm({ onClose }: Props) {
  const signup = async (data: { email: string; password: string }) => {
    const supabase = createClient();

    const {
      error,
      data: { user },
    } = await supabase.auth.signUp(data);

    if (error) {
      redirect("/error");
    }

    await supabase
      .from("profiles")
      .insert({ user_id: user!.id, acc_role: "teacher" });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const { name, email } = Object.fromEntries(formData) as {
      name: string;
      email: string;
    };

    await signup({ email, password: name });

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg">
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
        <input
          className="bg-slate-500 px-4 py-2 rounded-lg text-white placeholder:text-white"
          type="text"
          name="name"
          placeholder="Nama"
        />
        <input
          className="bg-slate-500 px-4 py-2 rounded-lg text-white placeholder:text-white"
          type="email"
          name="email"
          placeholder="Email"
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
}

export default TeacherForm;
