export type Student = {
  id: string;
  name: string;
  nis: number;
  parentEmail: string;
};

export type ClassRoom = {
  id: string;
  grade: number;
  code: string;
  academicYear: {
    odd: number;
    even: number;
  };
};