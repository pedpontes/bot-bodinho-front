"use client";

import { UserProvider, useUser } from "@/contexts/UserProvider";
import { BASE_URL } from "@/helpers/http";
import {
  BarChartOutlined,
  UserOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Layout, Space, Typography } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

const { Header, Content } = Layout;
const { Title } = Typography;

interface AppLayoutProps {
  children: ReactNode;
  requireAuth?: boolean;
}

export function AppLayout({ children, requireAuth = false }: AppLayoutProps) {
  return (
    <UserProvider requireAuth={requireAuth}>
      <Layout style={{ minHeight: "100vh" }}>
        <Navbar />
        <Content>{children}</Content>
      </Layout>
    </UserProvider>
  );
}

function Navbar() {
  const { user, loading, handleLogout } = useUser();
  const router = useRouter();

  const handleLogin = () => {
    router.push(
      process.env.NEXT_PUBLIC_API_URL || BASE_URL + "/api/oauth/discord"
    );
  };

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingInline: 24,
        background: "rgba(0, 0, 0, 0.85)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <RocketOutlined style={{ fontSize: 24, color: "#FFFFFF" }} />
        <Title
          level={4}
          style={{ margin: 0, color: "#FFFFFF", fontWeight: "bold" }}
        >
          Bot Bodinho
        </Title>
      </Link>

      <Space>
        {user && (
          <Link href="/sessions">
            <Button
              type="primary"
              icon={<BarChartOutlined />}
              style={{
                background: "rgba(255,255,255,0.2)",
                borderColor: "rgba(255,255,255,0.3)",
                backdropFilter: "blur(10px)",
              }}
            >
              Acessar Métricas
            </Button>
          </Link>
        )}

        {!loading && !user && (
          <Button
            onClick={handleLogin}
            style={{
              background: "#5865F2",
              borderColor: "#5865F2",
              color: "white",
            }}
          >
            Login com Discord
          </Button>
        )}

        {!loading && user && (
          <Space>
            <Avatar icon={<UserOutlined />} />
            <span style={{ color: "white" }}>{user.username}</span>
            <Button onClick={handleLogout}>Sair</Button>
          </Space>
        )}
      </Space>
    </Header>
  );
}

