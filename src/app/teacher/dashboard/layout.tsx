"use client";

import { Profile } from "@/lib/data/profile";
import { TProfile } from "@/types/public.database.types";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import clsx from "clsx";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

const navLinks = [
  {
    path: "classes",
    name: "Daftar Kelas",
  },
];

const client = createClient();
const profile = new Profile(client);

export default function TeacherDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [userProfile, setUserProfile] = useState<TProfile | null>(null);

  const handleSignOut = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { error } = await client.auth.signOut();

    if (error) {
      console.error(error);
    } else {
      redirect("/");
    }
  };

  useEffect(() => {
    async function getUser() {
      const { data, error } = await client.auth.getUser();

      if (error) {
        console.error("Cannot get user", error);
        return;
      }

      if (data) {
        setUserProfile(
          await profile.getBy([{ col: "user_id", val: data.user.id }])
        );
      }
    }

    getUser();
  }, [userProfile]);

  return (
    <div className="p-4">
      <div className="flex justify-between bg-slate-500 text-white px-6 py-4 rounded-xl items-center overflow-hidden">
        <div className="flex items-center gap-6">
          <div className="font-bold text-xl">
            <Link href="/admin/dashboard">Dashboard</Link>
          </div>
          <nav className="flex gap-4 items-center">
            {navLinks.map((link) => (
              <Link
                className={clsx(
                  "hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors",
                  {
                    "bg-white bg-opacity-20":
                      pathname === `/teacher/dashboard/${link.path}`,
                  }
                )}
                href={`/teacher/dashboard/${link.path}`}
                key={link.path}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center">
          {userProfile && <div>{userProfile.name}</div>} <span className="inline-block ml-2">|</span>
          <form onSubmit={handleSignOut}>
            <button className="hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors">
              Sign out
            </button>
          </form>
        </div>
      </div>

      <div className="p-4 bg-slate-500 rounded-xl mt-6 mb-16">{children}</div>
    </div>
  );
}
