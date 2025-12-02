import { UserProvider } from '@/contexts/UserProvider';

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider requireAuth={true}>
      {children}
    </UserProvider>
  );
}