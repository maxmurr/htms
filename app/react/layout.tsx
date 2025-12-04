"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const patterns = [
  { href: "/react/use-hook", label: "use()" },
  { href: "/react/use-cache", label: "cache" },
];

export default function ReactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="max-w-lg mx-auto px-6 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground"
            >
              ←
            </Link>
            <span className="font-medium">React 19</span>
          </div>
          <nav className="flex gap-4 text-sm">
            {patterns.map((pattern) => (
              <Link
                key={pattern.href}
                href={pattern.href}
                className={
                  pathname === pattern.href
                    ? "font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }
              >
                {pattern.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="max-w-lg mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
