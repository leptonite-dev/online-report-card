import { redirect } from "next/navigation";

export default function DashboardPage() {
  return redirect("/admin/dashboard/classes");
}
