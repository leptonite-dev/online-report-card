import { redirect } from "next/navigation";

type Params = {
  subjectId: number;
};

interface Props {
  params: Promise<Params>;
}

const ClassPage = async ({ params }: Props) => {
  const { subjectId } = await params;
  return redirect(`${subjectId}/students`);
};

export default ClassPage;
