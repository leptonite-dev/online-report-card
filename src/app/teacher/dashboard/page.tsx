import { redirect } from "next/navigation";

const TeacherDashboardPage = () => {
  return redirect("/teacher/dashboard/classes");
};

export default TeacherDashboardPage;
