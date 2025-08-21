type Endpoint = {
  method: string;
  path: string;
  description: string;
  auth?: "public" | "auth" | "admin";
  params?: Array<{ name: string; in: "query" | "path" | "body"; required?: boolean; type?: string; description?: string }>;
  sampleRequest?: unknown;
  sampleResponse?: unknown;
};

const endpoints: Endpoint[] = [
  {
    method: "GET",
    path: "/api/courses",
    description: "Get all active courses with lessons and enrollment counts",
    auth: "public",
    sampleResponse: [
      {
        id: "course_id",
        code: "PRN212",
        name: "ASP.NET WPF",
        lessons: [{ id: "lesson_id", title: "Intro WPF", order: 1 }],
        _count: { enrollments: 5 }
      }
    ]
  },
  {
    method: "GET",
    path: "/api/courses/{id}",
    description: "Get a course by id with lessons and enrollments",
    auth: "public",
    params: [{ name: "id", in: "path", required: true, type: "string" }]
  },
  {
    method: "POST",
    path: "/api/courses",
    description: "Create a new course",
    auth: "admin",
    sampleRequest: { code: "PRN999", name: "New Course", description: "...", duration: 60, videoUrl: "https://..." }
  },
  {
    method: "PUT",
    path: "/api/courses/{id}",
    description: "Update a course",
    auth: "admin",
    params: [{ name: "id", in: "path", required: true, type: "string" }]
  },
  { method: "DELETE", path: "/api/courses/{id}", description: "Delete a course", auth: "admin" },
  {
    method: "GET",
    path: "/api/blog/posts",
    description: "List published blog posts with pagination and filters",
    auth: "public",
    params: [
      { name: "category", in: "query", type: "string" },
      { name: "tag", in: "query", type: "string" },
      { name: "page", in: "query", type: "number" },
      { name: "limit", in: "query", type: "number" }
    ]
  },
  { method: "GET", path: "/api/blog/posts/{id}", description: "Get blog post by id", auth: "public" },
  { method: "POST", path: "/api/blog/posts", description: "Create blog post", auth: "auth" },
  { method: "PUT", path: "/api/blog/posts/{id}", description: "Update blog post (Author/Admin)", auth: "auth" },
  { method: "DELETE", path: "/api/blog/posts/{id}", description: "Delete blog post (Author/Admin)", auth: "auth" },
  { method: "GET", path: "/api/user/enroll", description: "List user enrollments", auth: "auth" },
  { method: "POST", path: "/api/user/enroll", description: "Enroll current user in a course", auth: "auth", sampleRequest: { courseId: "course_id" } },
  { method: "GET", path: "/api/user/progress", description: "Get user lesson progress", auth: "auth" },
  { method: "POST", path: "/api/user/progress", description: "Upsert lesson progress", auth: "auth", sampleRequest: { lessonId: "lesson_id", completed: true } }
];

function Badge({ children, intent }: { children: React.ReactNode; intent: "GET" | "POST" | "PUT" | "DELETE" }) {
  const color = {
    GET: "bg-emerald-600",
    POST: "bg-sky-600",
    PUT: "bg-amber-600",
    DELETE: "bg-rose-600"
  }[intent];
  return <span className={`text-xs px-2 py-1 rounded text-white ${color}`}>{children}</span>;
}

function AuthTag({ level }: { level?: Endpoint["auth"] }) {
  if (!level) return null;
  const label = level === "public" ? "Public" : level === "auth" ? "Auth" : "Admin";
  const color = level === "public" ? "bg-gray-200 text-gray-700" : level === "auth" ? "bg-indigo-600 text-white" : "bg-black text-white";
  return <span className={`text-[10px] px-2 py-0.5 rounded ${color}`}>{label}</span>;
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-2">Passcode Academy API</h1>
        <p className="text-gray-600 mb-8">Swagger-like documentation for the e-learning backend APIs</p>

        <div className="space-y-4">
          {endpoints.map((ep, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <Badge intent={ep.method as "GET" | "POST" | "PUT" | "DELETE"}>{ep.method}</Badge>
                <code className="text-sm bg-gray-100 px-2 py-1 rounded">{ep.path}</code>
                <AuthTag level={ep.auth} />
              </div>
              <p className="text-sm text-gray-700 mb-3">{ep.description}</p>
              {ep.params && ep.params.length > 0 && (
                <div className="mb-3">
                  <div className="text-xs font-semibold text-gray-500 mb-1">Parameters</div>
                  <ul className="text-sm list-disc pl-5">
                    {ep.params.map((p, i) => (
                      <li key={i}>
                        <span className="font-mono">{p.name}</span> in <span className="font-mono">{p.in}</span>
                        {p.required ? <span className="text-rose-600"> (required)</span> : null}
                        {p.type ? <span> – {p.type}</span> : null}
                        {p.description ? <span>: {p.description}</span> : null}
          </li>
                    ))}
                  </ul>
                </div>
              )}
              {(ep.sampleRequest !== undefined || ep.sampleResponse !== undefined) && (
                <div className="grid sm:grid-cols-2 gap-3">
                  {ep.sampleRequest !== undefined && (
                    <div>
                      <div className="text-xs font-semibold text-gray-500 mb-1">Sample Request</div>
                      <pre className="bg-gray-50 border border-gray-200 rounded p-2 text-xs overflow-auto">{JSON.stringify(ep.sampleRequest, null, 2)}</pre>
                    </div>
                  )}
                  {ep.sampleResponse !== undefined && (
                    <div>
                      <div className="text-xs font-semibold text-gray-500 mb-1">Sample Response</div>
                      <pre className="bg-gray-50 border border-gray-200 rounded p-2 text-xs overflow-auto">{JSON.stringify(ep.sampleResponse, null, 2)}</pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 text-xs text-gray-500">
          Note: Protected routes require authentication via Clerk. Admin-only routes require the user role to be <code className="px-1 bg-gray-100 rounded">ADMIN</code>.
        </div>
      </div>
    </div>
  );
}
