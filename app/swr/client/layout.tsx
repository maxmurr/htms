import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SWR - Hook",
  description: "Client-side data fetching with SWR useSWR hook and stale-while-revalidate caching.",
};

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
