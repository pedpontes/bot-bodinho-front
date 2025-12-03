import { AppLayout } from "@/components/AppLayout";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}

