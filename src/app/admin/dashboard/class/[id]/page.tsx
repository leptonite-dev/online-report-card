import { redirect } from "next/navigation";

async function ClassPage({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params;
  return redirect(`${id}/students`);
}

export default ClassPage;
