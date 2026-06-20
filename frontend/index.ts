// ============================================================
// CORE TYPES — AI Academic Learning & Assessment Platform
// ============================================================

export type UserRole = "FACULTY" | "STUDENT" | "ADMIN";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  department?: string;
  collegeId?: string;
  isActive: boolean;
  createdAt: string;
}

// ── Subject ─────────────────────────────────────────────────
export interface Subject {
  id: string;
  name: string;
  code: string;
  description?: string;
  semester?: string;
  year?: number;
  department?: string;
  facultyId: string;
  faculty?: Pick<User, "id" | "name" | "email">;
  topicCount?: number;
  studentCount?: number;
  materialCount?: number;
  createdAt: string;
  updatedAt: string;
}

// ── Topic ────────────────────────────────────────────────────
export interface Topic {
  id: string;
  name: string;
  description?: string;
  order: number;
  unit?: string;
  chapter?: string;
  subjectId: string;
  parentId?: string;
  children?: Topic[];
  materialCount?: number;
  createdAt: string;
}

// ── Material ─────────────────────────────────────────────────
export type MaterialType =
  | "PDF"
  | "PPT"
  | "LECTURE_NOTES"
  | "LAB_MANUAL"
  | "TEXTBOOK"
  | "OTHER";

export type ParseStatus = "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";

export interface Material {
  id: string;
  title: string;
  description?: string;
  type: MaterialType;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  parseStatus: ParseStatus;
  chunkCount: number;
  subjectId: string;
  topicId?: string;
  uploadedById: string;
  uploadedBy?: Pick<User, "id" | "name">;
  subject?: Pick<Subject, "id" | "name" | "code">;
  topic?: Pick<Topic, "id" | "name">;
  createdAt: string;
  updatedAt: string;
}

// ── Question & Answer ─────────────────────────────────────────
export type QuestionType =
  | "MCQ"
  | "SHORT_ANSWER"
  | "LONG_ANSWER"
  | "NUMERICAL";
export type Difficulty = "EASY" | "MEDIUM" | "HARD";

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  marks: number;
  unit?: string;
  chapter?: string;
  difficulty: Difficulty;
  topicId?: string;
  subjectId: string;
  paperYear?: string;
  createdAt: string;
  answerKey?: AnswerKey;
}

export interface AnswerKey {
  id: string;
  questionId: string;
  answer: string;
  steps?: string[];
  version: number;
  fileUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// ── Session ───────────────────────────────────────────────────
export type SessionStatus = "SCHEDULED" | "ACTIVE" | "PAUSED" | "ENDED";
export type StudentSessionStatus = "ACTIVE" | "BACKGROUND" | "OFFLINE";

export interface Session {
  id: string;
  name: string;
  subjectId: string;
  subject?: Pick<Subject, "id" | "name" | "code">;
  facultyId: string;
  status: SessionStatus;
  startedAt?: string;
  endedAt?: string;
  pausedAt?: string;
  duration?: number;
  studentCount?: number;
  activeCount?: number;
  createdAt: string;
}

export interface SessionStudent {
  id: string;
  sessionId: string;
  studentId: string;
  student: Pick<User, "id" | "name" | "email" | "avatarUrl">;
  status: StudentSessionStatus;
  currentQuestion?: string;
  timeSpentSecs: number;
  exitCount: number;
  lastActivityAt?: string;
  joinedAt?: string;
}

// ── Enrollment ────────────────────────────────────────────────
export interface Enrollment {
  id: string;
  studentId: string;
  student?: Pick<User, "id" | "name" | "email">;
  subjectId: string;
  subject?: Pick<Subject, "id" | "name" | "code">;
  enrolledAt: string;
}

// ── Progress ──────────────────────────────────────────────────
export interface Progress {
  id: string;
  studentId: string;
  topicId: string;
  topic?: Pick<Topic, "id" | "name" | "unit" | "chapter">;
  completed: boolean;
  completedAt?: string;
  score?: number;
}

// ── AI Chat ───────────────────────────────────────────────────
export type MessageRole = "USER" | "ASSISTANT";

export interface ChatMessage {
  id: string;
  chatSessionId: string;
  role: MessageRole;
  content: string;
  citations?: Citation[];
  createdAt: string;
}

export interface Citation {
  materialId: string;
  materialTitle: string;
  page?: number;
  excerpt: string;
}

export interface ChatSession {
  id: string;
  studentId: string;
  subjectId?: string;
  topicId?: string;
  title?: string;
  createdAt: string;
  messages?: ChatMessage[];
}

// ── Analytics ─────────────────────────────────────────────────
export interface SessionAnalytics {
  sessionId: string;
  sessionName: string;
  totalStudents: number;
  activeStudents: number;
  avgTimeSpentMins: number;
  completionRate: number;
  avgExitCount: number;
  date: string;
}

export interface StudentPerformance {
  studentId: string;
  studentName: string;
  subjectId: string;
  subjectName: string;
  topicsCompleted: number;
  totalTopics: number;
  avgScore?: number;
  sessionsAttended: number;
  lastActive?: string;
}

// ── Shared UI Types ───────────────────────────────────────────
export interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number | string;
  children?: NavItem[];
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  render?: (value: unknown, row: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: PaginationMeta;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
  };
}

// ── File Upload ───────────────────────────────────────────────
export interface UploadProgress {
  file: File;
  progress: number;
  status: "pending" | "uploading" | "success" | "error";
  error?: string;
  materialId?: string;
}
