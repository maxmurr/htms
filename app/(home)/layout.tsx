import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Explore modern data fetching patterns in Next.js 16 with React Query, SWR, and React 19.",
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
