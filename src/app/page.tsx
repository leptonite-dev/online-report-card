"use client";

import { useState } from "react";

export default function Home() {
  const [signInMode, setSignInMode] = useState("teacher");

  return (
    <div className="p-4 h-screen flex flex-col justify-center">
      <div className="grid grid-cols-2 justify-center mb-6 rounded-full w-48 mx-auto">
        <button
          onClick={() => setSignInMode("guru")}
          className="bg-blue-300 px-4 py-3 rounded-s-full font-bold text-[rgba(0,0,0,0.7)]"
        >
          Guru
        </button>
        <button
          onClick={() => setSignInMode("admin")}
          className="bg-slate-300 px-4 py-3 rounded-e-full font-bold text-[rgba(0,0,0,0.7)]"
        >
          Admin
        </button>
      </div>
      <div className="flex flex-nowrap w-full rounded-xl overflow-hidden max-w-xl mx-auto">
        <div
          className={`flex flex-nowrap w-full transition-transform duration-300 ${
            signInMode === "admin" ? "-translate-x-full" : "translate-x-0"
          }`}
        >
          <div className="bg-blue-300 w-full grow-1 shrink-0">
            <form className="flex flex-col p-4 gap-2">
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
            </form>
          </div>
          <div className="bg-slate-300 w-full grow-1 shrink-0">
            <form className="flex flex-col p-4 gap-2">
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
