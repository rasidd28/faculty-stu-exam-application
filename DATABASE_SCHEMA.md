# DATABASE_SCHEMA.md — PostgreSQL via Prisma

## Models

### User (Faculty + Student via role discriminator)
```prisma
model User {
  id           String   @id @default(cuid())
  email        String   @unique
  passwordHash String
  role         Role     @default(STUDENT)
  name         String
  avatarUrl    String?
  department   String?
  collegeId    String?
  isActive     Boolean  @default(true)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  // Faculty relations
  subjectsCreated  Subject[]
  sessionsCreated  Session[]
  uploadsCreated   Material[]

  // Student relations
  enrollments      Enrollment[]
  sessionStudents  SessionStudent[]
  chatSessions     ChatSession[]
  progressRecords  Progress[]
}

enum Role {
  FACULTY
  STUDENT
  ADMIN
}
```

### Subject
```prisma
model Subject {
  id          String   @id @default(cuid())
  name        String
  code        String   @unique
  description String?
  semester    String?
  year        Int?
  department  String?
  facultyId   String
  faculty     User     @relation(fields: [facultyId], references: [id])
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  topics      Topic[]
  materials   Material[]
  enrollments Enrollment[]
  sessions    Session[]
}
```

### Topic
```prisma
model Topic {
  id          String   @id @default(cuid())
  name        String
  description String?
  order       Int      @default(0)
  unit        String?
  chapter     String?
  subjectId   String
  subject     Subject  @relation(fields: [subjectId], references: [id])
  parentId    String?
  parent      Topic?   @relation("TopicHierarchy", fields: [parentId], references: [id])
  children    Topic[]  @relation("TopicHierarchy")
  createdAt   DateTime @default(now())

  materials   Material[]
  progress    Progress[]
  questions   Question[]
}
```

### Material
```prisma
model Material {
  id           String         @id @default(cuid())
  title        String
  description  String?
  type         MaterialType
  fileUrl      String
  fileSize     Int
  mimeType     String
  parseStatus  ParseStatus    @default(PENDING)
  chunkCount   Int            @default(0)
  subjectId    String
  subject      Subject        @relation(fields: [subjectId], references: [id])
  topicId      String?
  topic        Topic?         @relation(fields: [topicId], references: [id])
  uploadedById String
  uploadedBy   User           @relation(fields: [uploadedById], references: [id])
  createdAt    DateTime       @default(now())
  updatedAt    DateTime       @updatedAt

  chunks       MaterialChunk[]
}

enum MaterialType {
  PDF
  PPT
  LECTURE_NOTES
  LAB_MANUAL
  TEXTBOOK
  OTHER
}

enum ParseStatus {
  PENDING
  PROCESSING
  COMPLETED
  FAILED
}
```

### MaterialChunk (for RAG)
```prisma
model MaterialChunk {
  id         String   @id @default(cuid())
  materialId String
  material   Material @relation(fields: [materialId], references: [id])
  content    String
  chunkIndex Int
  embedding  Float[]  // pgvector
  metadata   Json?
  createdAt  DateTime @default(now())
}
```

### Question
```prisma
model Question {
  id          String       @id @default(cuid())
  text        String
  type        QuestionType @default(SHORT_ANSWER)
  marks       Int          @default(1)
  unit        String?
  chapter     String?
  difficulty  Difficulty   @default(MEDIUM)
  topicId     String?
  topic       Topic?       @relation(fields: [topicId], references: [id])
  subjectId   String
  paperYear   String?
  createdAt   DateTime     @default(now())

  answerKey   AnswerKey?
}

enum QuestionType {
  MCQ
  SHORT_ANSWER
  LONG_ANSWER
  NUMERICAL
}

enum Difficulty {
  EASY
  MEDIUM
  HARD
}
```

### AnswerKey
```prisma
model AnswerKey {
  id         String   @id @default(cuid())
  questionId String   @unique
  question   Question @relation(fields: [questionId], references: [id])
  answer     String
  steps      Json?    // array of step strings
  version    Int      @default(1)
  fileUrl    String?
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}
```

### Session
```prisma
model Session {
  id          String        @id @default(cuid())
  name        String
  subjectId   String
  subject     Subject       @relation(fields: [subjectId], references: [id])
  facultyId   String
  faculty     User          @relation(fields: [facultyId], references: [id])
  status      SessionStatus @default(SCHEDULED)
  startedAt   DateTime?
  endedAt     DateTime?
  pausedAt    DateTime?
  duration    Int?          // minutes
  createdAt   DateTime      @default(now())

  students    SessionStudent[]
}

enum SessionStatus {
  SCHEDULED
  ACTIVE
  PAUSED
  ENDED
}
```

### SessionStudent (monitoring data)
```prisma
model SessionStudent {
  id              String              @id @default(cuid())
  sessionId       String
  session         Session             @relation(fields: [sessionId], references: [id])
  studentId       String
  student         User                @relation(fields: [studentId], references: [id])
  status          StudentSessionStatus @default(OFFLINE)
  currentQuestion String?
  timeSpentSecs   Int                 @default(0)
  exitCount       Int                 @default(0)
  lastActivityAt  DateTime?
  joinedAt        DateTime?
  leftAt          DateTime?
}

enum StudentSessionStatus {
  ACTIVE
  BACKGROUND
  OFFLINE
}
```

### Enrollment
```prisma
model Enrollment {
  id         String   @id @default(cuid())
  studentId  String
  student    User     @relation(fields: [studentId], references: [id])
  subjectId  String
  subject    Subject  @relation(fields: [subjectId], references: [id])
  enrolledAt DateTime @default(now())

  @@unique([studentId, subjectId])
}
```

### Progress
```prisma
model Progress {
  id          String   @id @default(cuid())
  studentId   String
  student     User     @relation(fields: [studentId], references: [id])
  topicId     String
  topic       Topic    @relation(fields: [topicId], references: [id])
  completed   Boolean  @default(false)
  completedAt DateTime?
  score       Float?
  updatedAt   DateTime @updatedAt
}
```

### ChatSession (AI Tutor)
```prisma
model ChatSession {
  id        String      @id @default(cuid())
  studentId String
  student   User        @relation(fields: [studentId], references: [id])
  subjectId String?
  topicId   String?
  title     String?
  createdAt DateTime    @default(now())

  messages  ChatMessage[]
}

model ChatMessage {
  id            String      @id @default(cuid())
  chatSessionId String
  chatSession   ChatSession @relation(fields: [chatSessionId], references: [id])
  role          MessageRole
  content       String
  citations     Json?       // source chunks referenced
  createdAt     DateTime    @default(now())
}

enum MessageRole {
  USER
  ASSISTANT
}
```
