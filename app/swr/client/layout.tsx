import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SWR - Hook",
};

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
