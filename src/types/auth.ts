export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface StudentData extends User {
  role: 'student';
  enrolledCourses: string[];
  remainingFee: number;
  semester: number;
}

export interface TeacherData extends User {
  role: 'teacher';
  assignedClasses: string[];
  schedule: { day: string; time: string; course: string }[];
}

export interface AdminData extends User {
  role: 'admin';
}
