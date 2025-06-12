
export interface SubjectResult {
  subject: string;
  testScore: number;
  examScore: number;
  totalScore: number;
  grade: string;
}

export interface AffectiveAssessment {
  aCategory: string;
  grade: string;
}

export interface Psychomotor {
  pCategory: string;
  grade: string;
}

export interface StudentResult {
  id: string;
  userId: string;
  studentId: string;
  firstName: string;
  lastName: string;
  otherName: string;
  image: string;
  level: string;
  subLevel: string;
  term: string;
  session: string;
  position: string;
  totalScore: number;
  averageScore: number;
  numberInClass: number | null;
  teacherRemark: string;
  principalRemark: string;
  isPaid: boolean;
  createdAt: string;
  updatedAt: string;
  subjectResults: SubjectResult[];
  affectiveAssessment: AffectiveAssessment[];
  psychomotor: Psychomotor[];
}
