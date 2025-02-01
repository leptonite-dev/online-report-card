import { redirect } from "next/navigation";

type Params = {
  even: number;
};

interface Props {
  params: Promise<Params>;
}

const ClassPage = async ({ params }: Props) => {
  const { even } = await params;
  return redirect(`${even}/students`);
};

export default ClassPage;
