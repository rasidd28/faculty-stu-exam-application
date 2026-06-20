// ============================================================
// CONSTANTS — AI Academic Platform
// ============================================================

export const APP_NAME = "EduAI Platform";
export const APP_TAGLINE = "AI-Powered Academic Learning & Assessment";

export const MATERIAL_TYPES = [
  { value: "PDF", label: "PDF Document", accept: ".pdf", icon: "📄" },
  { value: "PPT", label: "Presentation", accept: ".ppt,.pptx", icon: "📊" },
  {
    value: "LECTURE_NOTES",
    label: "Lecture Notes",
    accept: ".pdf,.doc,.docx",
    icon: "📝",
  },
  {
    value: "LAB_MANUAL",
    label: "Lab Manual",
    accept: ".pdf,.doc,.docx",
    icon: "🔬",
  },
  {
    value: "TEXTBOOK",
    label: "Textbook",
    accept: ".pdf",
    icon: "📚",
  },
  { value: "OTHER", label: "Other", accept: "*", icon: "📁" },
] as const;

export const DIFFICULTY_LEVELS = [
  { value: "EASY", label: "Easy", color: "emerald" },
  { value: "MEDIUM", label: "Medium", color: "amber" },
  { value: "HARD", label: "Hard", color: "red" },
] as const;

export const QUESTION_TYPES = [
  { value: "MCQ", label: "Multiple Choice" },
  { value: "SHORT_ANSWER", label: "Short Answer" },
  { value: "LONG_ANSWER", label: "Long Answer" },
  { value: "NUMERICAL", label: "Numerical" },
] as const;

export const SESSION_STATUSES = [
  { value: "SCHEDULED", label: "Scheduled", color: "blue" },
  { value: "ACTIVE", label: "Active", color: "emerald" },
  { value: "PAUSED", label: "Paused", color: "amber" },
  { value: "ENDED", label: "Ended", color: "zinc" },
] as const;

export const STUDENT_SESSION_STATUSES = [
  { value: "ACTIVE", label: "Active", color: "emerald" },
  { value: "BACKGROUND", label: "Background", color: "amber" },
  { value: "OFFLINE", label: "Offline", color: "zinc" },
] as const;

export const PARSE_STATUSES = [
  { value: "PENDING", label: "Pending", color: "amber" },
  { value: "PROCESSING", label: "Processing", color: "blue" },
  { value: "COMPLETED", label: "Completed", color: "emerald" },
  { value: "FAILED", label: "Failed", color: "red" },
] as const;

export const NAV_FACULTY = [
  {
    group: "Overview",
    items: [{ label: "Dashboard", href: "/faculty/dashboard", icon: "LayoutDashboard" }],
  },
  {
    group: "Academic",
    items: [
      { label: "Subjects", href: "/faculty/subjects", icon: "BookOpen" },
      { label: "Topics", href: "/faculty/topics", icon: "ListTree" },
      { label: "Students", href: "/faculty/students", icon: "Users" },
    ],
  },
  {
    group: "Content",
    items: [
      { label: "Upload Materials", href: "/faculty/materials", icon: "Upload" },
      { label: "Knowledge Base", href: "/faculty/knowledge-base", icon: "Database" },
      { label: "Question Bank", href: "/faculty/question-bank", icon: "FileQuestion" },
      { label: "Answer Keys", href: "/faculty/answer-keys", icon: "CheckSquare" },
    ],
  },
  {
    group: "Sessions",
    items: [
      { label: "Manage Sessions", href: "/faculty/sessions", icon: "CalendarClock" },
      { label: "Live Monitoring", href: "/faculty/monitoring", icon: "Monitor" },
    ],
  },
  {
    group: "Insights",
    items: [
      { label: "Analytics", href: "/faculty/analytics", icon: "BarChart3" },
    ],
  },
] as const;

export const NAV_STUDENT = [
  {
    group: "Overview",
    items: [{ label: "Dashboard", href: "/student/dashboard", icon: "LayoutDashboard" }],
  },
  {
    group: "Learning",
    items: [
      { label: "My Subjects", href: "/student/subjects", icon: "BookOpen" },
      { label: "Materials", href: "/student/materials", icon: "FileText" },
      { label: "Question Bank", href: "/student/question-bank", icon: "FileQuestion" },
    ],
  },
  {
    group: "AI Tools",
    items: [{ label: "AI Tutor", href: "/student/ai-tutor", icon: "Bot" }],
  },
  {
    group: "Progress",
    items: [{ label: "My Progress", href: "/student/progress", icon: "TrendingUp" }],
  },
] as const;

export const PAGINATION_SIZES = [10, 20, 50, 100] as const;
export const DEFAULT_PAGE_SIZE = 20;

export const AI_WELCOME_MESSAGE = `Hello! I'm your AI Tutor powered by the course materials your faculty has uploaded. I can help you with:

- **Explaining concepts** step-by-step
- **Solving problems** with detailed workings
- **Finding similar examples** from your textbook
- **Formula explanations** with derivations

What would you like to learn today?`;

export const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
] as const;
