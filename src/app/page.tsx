"use client";

import { FormEvent, useState } from "react";
import { signin, signup } from "./actions";
import clsx from "clsx";

export default function HomePage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.target as HTMLFormElement);

    if (mode === "signin") {
      signin(data);
    } else {
      signup(data);
    }
  };

  return (
    <div className="p-4 h-screen flex flex-col justify-center items-center gap-4">
      <div className="bg-slate-300 p-2 rounded-lg w-full max-w-lg grid grid-cols-2">
        <button
          className={clsx(
            "p-3 transition-colors duration-300 font-semibold rounded-lg",
            mode === "signin" ? "bg-white" : "text-white"
          )}
          type="button"
          onClick={() => setMode("signin")}
        >
          Sign in
        </button>
        <button
          className={clsx(
            "p-3 transition-colors duration-300 font-semibold rounded-lg",
            mode === "signup" ? "bg-white" : "text-white"
          )}
          onClick={() => setMode("signup")}
        >
          Sign up
        </button>
      </div>

      <div className="bg-slate-300 rounded-lg w-full max-w-lg">
        <form onSubmit={handleSubmit} className="flex flex-col p-4 gap-2">
          {mode === "signup" && (
            <input
              className="rounded-lg px-4 py-2"
              type="text"
              name="name"
              placeholder="Nama"
            />
          )}
          <input
            className="rounded-lg px-4 py-2"
            type="text"
            name="email"
            placeholder="Email"
          />
          <input
            className="rounded-lg px-4 py-2"
            type="password"
            name="password"
            placeholder="Password"
          />

          <button className="rounded-lg px-4 py-2 bg-white mt-2 font-semibold">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
