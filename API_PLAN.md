# API_PLAN.md — REST API Design

## Base URL
```
/api/v1
```

## Authentication
All protected routes require:
```
Authorization: Bearer <jwt_token>
```

---

## Auth Endpoints
```
POST   /auth/faculty/login      → { token, user }
POST   /auth/student/login      → { token, user }
POST   /auth/logout
POST   /auth/forgot-password
POST   /auth/reset-password
GET    /auth/me                 → current user
```

## Subject Endpoints
```
GET    /subjects                → list (faculty: own, student: enrolled)
POST   /subjects                → create (faculty only)
GET    /subjects/:id            → detail
PUT    /subjects/:id            → update
DELETE /subjects/:id            → delete
GET    /subjects/:id/topics     → topics for subject
GET    /subjects/:id/students   → enrolled students
GET    /subjects/:id/materials  → materials for subject
```

## Topic Endpoints
```
GET    /topics?subjectId=       → list
POST   /topics                  → create
GET    /topics/:id
PUT    /topics/:id
DELETE /topics/:id
```

## Material Endpoints
```
GET    /materials?subjectId=    → list
POST   /materials/upload        → multipart/form-data
GET    /materials/:id
DELETE /materials/:id
GET    /materials/:id/status    → parse/processing status
POST   /materials/:id/reprocess → retry failed parse
```

## Knowledge Base Endpoints
```
GET    /knowledge-base?subjectId=
GET    /knowledge-base/search?q=&subjectId=  → semantic search
```

## Question Bank Endpoints
```
GET    /questions?subjectId=&topicId=&unit=
POST   /questions               → create single
POST   /questions/bulk          → CSV upload
GET    /questions/:id
PUT    /questions/:id
DELETE /questions/:id
```

## Answer Key Endpoints
```
GET    /answer-keys?questionId=
POST   /answer-keys
PUT    /answer-keys/:id
DELETE /answer-keys/:id
```

## Student / Enrollment Endpoints
```
GET    /students                → faculty: all, student: self
POST   /students/invite         → add single
POST   /students/bulk           → CSV upload
GET    /students/:id
PUT    /students/:id
DELETE /students/:id
POST   /enrollments             → enroll student in subject
DELETE /enrollments/:id         → unenroll
```

## Session Endpoints
```
GET    /sessions
POST   /sessions                → create
GET    /sessions/:id
PUT    /sessions/:id
POST   /sessions/:id/start
POST   /sessions/:id/pause
POST   /sessions/:id/end
GET    /sessions/:id/students   → monitoring data
```

## Monitoring Endpoints (WebSocket)
```
WS /monitoring/session/:id      → real-time student events

Events (server → faculty):
  student:joined   { studentId, name }
  student:active   { studentId, question, timeSpent }
  student:bg       { studentId }
  student:offline  { studentId }
  student:exit     { studentId, count }

Events (student → server):
  heartbeat        { sessionId, studentId, question }
  page:hidden      { sessionId, studentId }
  page:visible     { sessionId, studentId }
```

## Analytics Endpoints
```
GET /analytics/sessions?from=&to=          → session summary
GET /analytics/engagement?sessionId=       → per-student engagement
GET /analytics/performance?subjectId=      → student scores
GET /analytics/subjects?facultyId=         → subject statistics
```

## AI Tutor Endpoints
```
GET    /chat-sessions?studentId=
POST   /chat-sessions                      → create
GET    /chat-sessions/:id/messages
POST   /chat-sessions/:id/messages         → send message (streams)
DELETE /chat-sessions/:id
```

## Progress Endpoints
```
GET    /progress?studentId=&subjectId=
POST   /progress                           → mark topic complete
GET    /progress/summary/:studentId
```

---

## Response Format
```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "pageSize": 20,
    "total": 145
  }
}
```

## Error Format
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or expired token"
  }
}
```

## Status Codes
```
200 OK
201 Created
204 No Content
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
422 Validation Error
500 Internal Server Error
```
