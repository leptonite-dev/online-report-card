import TeachersDisplay from "./TeachersDisplay";

export default function TeacherListPage() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <TeachersDisplay />
      </div>
    </>
  );
}
