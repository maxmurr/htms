import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "React Query - Hook",
  description: "Client-side data fetching with React Query useQuery hook and automatic caching.",
};

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
