# ARCHITECTURE.md — AI Academic Learning & Assessment Platform

## Overview
A full-stack SaaS educational platform with two roles (Faculty, Student),
AI-powered tutoring via RAG, real-time session monitoring, and rich analytics.

---

## Tech Stack

### Frontend
| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Component Library | shadcn/ui v4 |
| Icons | Lucide React |
| State | React Context + hooks |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| Notifications | Sonner (shadcn) |
| Theme | next-themes |

### Backend
| Layer | Technology |
|-------|-----------|
| Runtime | Node.js 20 |
| Framework | Express 5 |
| Language | TypeScript 5 |
| ORM | Prisma 5 |
| Database | PostgreSQL 16 |
| Auth | JWT + bcrypt |
| File Storage | AWS S3 / local multer |
| AI/RAG | Anthropic Claude API |
| Vector DB | pgvector (Postgres extension) |
| Queue | Bull (Redis) for async processing |
| WebSockets | Socket.io (live monitoring) |

---

## Information Architecture

### Faculty Role — Page Hierarchy
```
/auth/faculty/login
/faculty/
  dashboard/               ← Home
  subjects/                ← Subject CRUD
    [id]/                  ← Subject detail
  topics/                  ← Topic CRUD
    [id]/                  ← Topic detail
  materials/               ← Upload center
    [id]/                  ← Material detail
  knowledge-base/          ← RAG document status
  question-bank/           ← Q-paper management
    [id]/
  answer-keys/             ← Solutions management
  students/                ← Student CRU + CSV
    [id]/
  sessions/                ← Session CRUD
    [id]/
  monitoring/              ← Live dashboard
  analytics/               ← Analytics
    session/
    engagement/
    performance/
    subjects/
```

### Student Role — Page Hierarchy
```
/auth/student/login
/student/
  dashboard/               ← Home
  subjects/                ← Enrolled subjects
    [id]/                  ← Subject detail
    [id]/topics/[topicId]/ ← Topic detail
  materials/               ← Viewer
    [id]/
  question-bank/           ← Assigned Qs
  ai-tutor/                ← Chat interface
  progress/                ← Learning stats
```

---

## Sidebar Navigation Structure

### Faculty Sidebar
```
OVERVIEW
  ├── Dashboard
  
ACADEMIC
  ├── Subjects
  ├── Topics
  ├── Students

CONTENT
  ├── Upload Materials
  ├── Knowledge Base
  ├── Question Bank
  ├── Answer Keys

SESSIONS
  ├── Manage Sessions
  ├── Live Monitoring

INSIGHTS
  └── Analytics
```

### Student Sidebar
```
OVERVIEW
  ├── Dashboard

LEARNING
  ├── My Subjects
  ├── Materials
  ├── Question Bank

AI TOOLS
  ├── AI Tutor

PROGRESS
  └── My Progress
```

---

## Component Architecture

### Shared Components
- `<AppShell>` — full page wrapper with sidebar + header
- `<PageHeader>` — breadcrumb + title + actions row
- `<StatCard>` — metric card with icon, value, trend
- `<DataTable>` — sortable/filterable table wrapper
- `<FileUploader>` — drag-drop upload with progress
- `<SearchBar>` — global command palette (Cmd+K)
- `<NotificationPanel>` — bell dropdown
- `<StatusBadge>` — Active / Background / Offline
- `<EmptyState>` — illustrated empty view
- `<LoadingSkeleton>` — shimmer placeholders
- `<ConfirmDialog>` — delete/destructive confirm
- `<ThemeToggle>` — dark/light switcher

### Faculty-Specific Components
- `<SubjectCard>` — subject overview card
- `<TopicTree>` — hierarchical topic list
- `<MaterialUploadCard>` — upload type selector
- `<DocumentParseStatus>` — processing progress ring
- `<StudentRow>` — monitoring table row with badges
- `<SessionTimer>` — live countdown / elapsed
- `<EngagementChart>` — line chart per student
- `<QuestionBankTable>` — question row with unit/chapter
- `<AnalyticsGrid>` — KPI summary grid

### Student-Specific Components
- `<SubjectEnrollCard>` — enrolled subject overview
- `<TopicProgressBar>` — completion tracker
- `<PDFViewer>` — embedded PDF renderer
- `<ChatMessage>` — AI tutor message bubble
- `<ChatSidebar>` — conversation history
- `<ContextPanel>` — source citations panel
- `<ProgressRing>` — circular completion indicator

---

## shadcn/ui Components Required
```
button, input, label, select, textarea, checkbox, radio-group,
switch, slider, badge, avatar, card, separator, tabs, accordion,
collapsible, dialog, alert-dialog, drawer, sheet, popover, tooltip,
hover-card, dropdown-menu, context-menu, navigation-menu, breadcrumb,
command, form, calendar, progress, skeleton, table, pagination,
scroll-area, resizable, sonner, chart
```

---

## Mobile Responsive Strategy
- Sidebar collapses to Sheet (drawer) on mobile via `useSidebar()`
- Grid layouts: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`
- Data tables scroll horizontally with `overflow-x-auto`
- Chat layout: sidebar hidden on mobile, toggled via bottom nav
- PDF viewer: full-screen modal on mobile
- Touch targets ≥ 44px for all interactive elements
- Bottom navigation bar for mobile student view

---

## Dark Mode Strategy
- `next-themes` with `ThemeProvider` at root
- All colors via CSS variables (--background, --foreground, etc.)
- Tailwind `dark:` variants for custom components
- Charts use CSS variable-based palettes

---

## Real-Time Architecture (Monitoring)
```
Faculty Browser ←→ Socket.io ←→ Backend Server ←→ Redis Pub/Sub
                                       ↕
Student Browser ←→ Socket.io ←→ Heartbeat Events
```
- Students emit heartbeats every 30s with current question + scroll position
- Faculty monitoring dashboard subscribes to session room
- Exit events (tab blur, window minimize) increment exit counter

---

## AI/RAG Pipeline
```
Upload → S3 → Parse (pdf-parse / pptx) → Chunk → Embed (Claude) 
→ pgvector → Query at chat time → Re-rank → Claude completion
```
