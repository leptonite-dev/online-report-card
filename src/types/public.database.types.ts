import { Tables } from "./database.types";

export type AcademicYear = {
  odd: number;
  even: number;
};

export type TProfile = Tables<"profiles">;

export type TClass = Tables<"classes">;

export type TStudent = Tables<"students">;

export type TSubject = Tables<"subjects">;

export type TTeacherSubject = Tables<"teacher_subject">;

export type TSubjectClassroom = Tables<"subject_classroom">;

export type TClassSubjectTeacher = Tables<"class_subject_teacher">;
