"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    path: "teacher",
    name: "Guru",
  },
  {
    path: "classes",
    name: "Kelas",
  },
  {
    path: "subjects",
    name: "Mata Pelajaran",
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

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
                      pathname === `/admin/dashboard/${link.path}`,
                  }
                )}
                href={`/admin/dashboard/${link.path}`}
                key={link.path}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <form action="">
          <button className="hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors">
            Sign out
          </button>
        </form>
      </div>

      <div className="p-4 bg-slate-500 rounded-xl mt-6 mb-16">{children}</div>
    </div>
  );
}
