import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "React Query - Hook",
};

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
