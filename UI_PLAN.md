# UI_PLAN.md — Design System & Component Plan

## Design Tokens

### Color Palette
```
Primary:    Blue   — #2563EB (blue-600) / #1D4ED8 (blue-700) dark
Secondary:  Indigo — #4F46E5 (indigo-600) / #4338CA (indigo-700) dark
Accent:     Emerald — #10B981 (emerald-500) / #059669 (emerald-600) dark
Warning:    Amber  — #F59E0B
Danger:     Red    — #EF4444
Surface:    bg-background (white / zinc-950)
Border:     border-border (zinc-200 / zinc-800)
Muted:      text-muted-foreground (zinc-500 / zinc-400)
```

### Typography
```
Display:  Inter (700) — page titles, hero numbers
Body:     Inter (400/500) — paragraphs, descriptions  
Mono:     JetBrains Mono — code, IDs, formulas
Scale:
  xs:   0.75rem / 12px
  sm:   0.875rem / 14px
  base: 1rem / 16px
  lg:   1.125rem / 18px
  xl:   1.25rem / 20px
  2xl:  1.5rem / 24px
  3xl:  1.875rem / 30px
  4xl:  2.25rem / 36px
```

### Spacing System (Tailwind defaults, 4px base)
- Section padding: p-6 (desktop), p-4 (mobile)
- Card padding: p-5
- Gap between cards: gap-4 / gap-6
- Sidebar width: 16rem (expanded) / 3rem (icon-only)

### Border Radius
- Cards: rounded-xl
- Buttons: rounded-lg
- Badges: rounded-full
- Inputs: rounded-md
- Avatar: rounded-full

---

## Page-by-Page Layout Plan

### Faculty Login
```
┌────────────────────────────────────┐
│  [Logo + Platform Name]            │
│                                    │
│  ┌──────────────────────────────┐  │
│  │  Welcome back, Faculty       │  │
│  │  Sign in to your account     │  │
│  │                              │  │
│  │  [Email Input]               │  │
│  │  [Password Input]            │  │
│  │  [Forgot Password?]          │  │
│  │  [Sign In Button]            │  │
│  │                              │  │
│  │  ─── or ───                  │  │
│  │  [Sign in as Student →]      │  │
│  └──────────────────────────────┘  │
│                                    │
│  Footer: © 2025 EduAI Platform    │
└────────────────────────────────────┘
```

### Faculty Dashboard
```
┌─Sidebar─┬─────────────────────────────────────┐
│ LOGO    │  [Breadcrumb] [Search] [Bell] [Avatar]│
│ ─────── │  ─────────────────────────────────── │
│Dashboard│  Welcome back, Prof. Sharma           │
│Subjects │                                       │
│Topics   │  ┌───┐ ┌───┐ ┌───┐ ┌───┐            │
│Students │  │ 8 │ │142│ │ 3 │ │ 47│            │
│Materials│  │Sbj│ │Stu│ │Act│ │Mat│            │
│Knowledge│  └───┘ └───┘ └───┘ └───┘            │
│Q.Bank   │                                       │
│Ans.Keys │  [Recent Activity]   [Quick Actions]  │
│Sessions │  ┌────────────────┐  ┌─────────────┐ │
│Monitor  │  │ · Uploaded PDF │  │+ New Subject│ │
│Analytics│  │ · Session end  │  │+ Upload Mat │ │
└─────────┘  │ · Student join │  │→ View Monitor│ │
             └────────────────┘  └─────────────┘ │
```

### Live Monitoring Dashboard
```
┌─Sidebar─┬──────────────────────────────────────────┐
│         │  Live Monitoring  [Session: Data Str. S3] │
│         │  ● 23 Active  ○ 4 Background  ✕ 2 Offline│
│         │  ──────────────────────────────────────── │
│         │  [Search students] [Filter: All ▾]        │
│         │                                            │
│         │  NAME          STATUS      QUESTION  TIME  │
│         │  Ananya K.     ● Active    Q.12      14m   │
│         │  Ravi P.       ● Active    Q.8       22m   │
│         │  Priya M.      ○ BG        Q.5       31m   │
│         │  Kiran S.      ✕ Offline   —          —    │
│         │  ...                                       │
└─────────┴──────────────────────────────────────────-┘
```

### AI Tutor Page
```
┌─Sidebar─┬──────────────────┬───────────────────────┐
│         │ Chat History     │  Chat Window          │
│         │ ─────────────── │  ─────────────────── │
│         │ ● DS Basics      │  [AI]: How can I      │
│         │ ● Sorting Algos  │  help you today?      │
│         │ ● Tree Traversal │                       │
│         │                  │  [User]: Explain BST  │
│         │ [+ New Chat]     │  insertion...         │
│         │                  │                       │
│         │                  │  [AI]: A Binary...    │
│         │──────────────────│  [Step 1] [Step 2]... │
│         │ Context          │                       │
│         │ Source: Ch.4 PDF │  ─────────────────── │
│         │ Pg. 82           │  [Ask anything...]    │
│         │                  │  [Send ▶]             │
└─────────┴──────────────────┴───────────────────────┘
```

---

## shadcn/ui Component Map

| Page | Key Components |
|------|---------------|
| Login | Card, Input, Button, Label, Form |
| Dashboard | Card, Badge, Skeleton, Tabs |
| Subjects | Table, Dialog, AlertDialog, Form, Badge |
| Topics | Accordion, Collapsible, Dialog, Tree |
| Materials | Card, Progress, Badge, Dialog, Tabs |
| Knowledge Base | Table, Progress, Badge, Tooltip |
| Q.Bank | Table, Tabs, Dialog, Select, Badge |
| Ans.Keys | Table, Dialog, Tabs, Badge |
| Students | Table, Dialog, Tabs, Avatar, Badge |
| Sessions | Card, Badge, Dialog, Button |
| Monitoring | Table, Badge, Avatar, Progress |
| Analytics | Chart (recharts), Tabs, Card, Select |
| AI Tutor | ScrollArea, Input, Avatar, Card, Sheet |
| Progress | Progress, Card, Chart, Badge |

---

## Loading / Empty / Error States

### Loading Skeleton Pattern
```tsx
<div className="space-y-3">
  <Skeleton className="h-10 w-full" />
  <Skeleton className="h-32 w-full" />
  <Skeleton className="h-32 w-full" />
</div>
```

### Empty State Pattern
```tsx
<div className="flex flex-col items-center py-16 text-muted-foreground">
  <Icon className="size-12 mb-4 opacity-40" />
  <h3 className="text-lg font-semibold text-foreground">No items yet</h3>
  <p className="text-sm mb-6">Get started by creating your first item.</p>
  <Button>Create Now</Button>
</div>
```

### Error State Pattern
```tsx
<Alert variant="destructive">
  <AlertCircle className="size-4" />
  <AlertTitle>Something went wrong</AlertTitle>
  <AlertDescription>
    {error.message}. <button onClick={retry}>Try again</button>
  </AlertDescription>
</Alert>
```
