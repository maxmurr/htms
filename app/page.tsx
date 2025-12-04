import Link from "next/link";

function GitHubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

const tools = [
  {
    title: "React Query",
    href: "/react-query/server",
    patterns: ["Server", "Client", "Full-Stack", "Suspense"],
  },
  {
    title: "React 19",
    href: "/react/use-hook",
    patterns: ["use() Hook", "use cache"],
  },
  {
    title: "SWR",
    href: "/swr/client",
    patterns: ["Client", "Full-Stack", "Suspense"],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full px-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-medium">Data Fetching Patterns</h1>
          <a
            href="https://github.com/maxmurr/htms"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="View on GitHub"
          >
            <GitHubIcon />
          </a>
        </div>
        <p className="text-sm text-muted-foreground mb-8">
          Next.js 16 + React 19 + Elysia
        </p>

        <nav className="space-y-4">
          {tools.map((tool) => (
            <Link
              key={tool.title}
              href={tool.href}
              className="block group"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-medium group-hover:underline">
                  {tool.title}
                </span>
                <span className="text-xs text-muted-foreground">
                  {tool.patterns.length} {tool.patterns.length === 1 ? "pattern" : "patterns"}
                </span>
              </div>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
