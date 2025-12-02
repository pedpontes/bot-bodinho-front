"use client";

import { UserModel } from "@/interfaces/user";
import { CheckAuthRequest } from "@/requests/auth/check-auth";
import { LogoutRequest } from "@/requests/auth/logout";
import { message } from "antd";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface UserContextType {
  user: UserModel | null;
  loading: boolean;
  handleLogout: () => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  handleLogout: () => {},
});

export const useUser = () => useContext(UserContext);

interface UserProviderProps {
  children: ReactNode;
  requireAuth?: boolean;
}

export function UserProvider({
  children,
  requireAuth = false,
}: UserProviderProps) {
  const [user, setUser] = useState<UserModel | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    CheckAuthRequest().then((userData) => {
      setUser(userData);
      setLoading(false);

      if (requireAuth && !userData) {
        router.push("/");
      }
    });
  }, [requireAuth, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  async function handleLogout() {
    try {
      await LogoutRequest();
      setUser(null);
    } catch (error) {
      message.error("Erro ao fazer logout, tente mais tarde");
    }
  }

  return (
    <UserContext.Provider value={{ user, loading, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
}
