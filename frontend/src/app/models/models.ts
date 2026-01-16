export interface Course {
  id?: number;
  title: string;
  description: string;
  status: 'planned' | 'active' | 'completed';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  instructor_id: number;
  instructor?: Instructor;
  created_at?: string;
  updated_at?: string;
}

export interface Student {
  id?: number;
  name: string;
  email: string;
  created_at?: string;
  updated_at?: string;
  courses_count?: number;
}

export interface Instructor {
  id?: number;
  name: string;
  email: string;
  created_at?: string;
  updated_at?: string;
}

export interface ContactMessage {
  id?: number;
  name: string;
  email: string;
  message: string;
  created_at?: string;
}

export interface DashboardStats {
  total_courses: number;
  active_courses: number;
  completed_courses: number;
}