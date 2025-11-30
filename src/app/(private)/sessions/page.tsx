"use client";

import { SessionModel } from "@/interfaces/session";
import { LoadSessionsRequest } from "@/requests/sessions/load-sessions";
import { Card, Table, Tag } from "antd";
import { useEffect, useState } from "react";

export default function SessionsPage() {
  const [sessions, setSessions] = useState<SessionModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSessions = async () => {
      try {
        const data = await LoadSessionsRequest();
        setSessions(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Erro ao carregar sessions:", error);
        setSessions([]);
      } finally {
        setLoading(false);
      }
    };

    loadSessions();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Player",
      dataIndex: "hasPlayer",
      key: "hasPlayer",
      render: (hasPlayer: boolean) => (
        <Tag color={hasPlayer ? "green" : "red"}>
          {hasPlayer ? "Ativo" : "Inativo"}
        </Tag>
      ),
    },
    {
      title: "Conexão",
      dataIndex: "hasConnection",
      key: "hasConnection",
      render: (hasConnection: boolean) => (
        <Tag color={hasConnection ? "blue" : "default"}>
          {hasConnection ? "Conectado" : "Desconectado"}
        </Tag>
      ),
    },
    {
      title: "Fila",
      dataIndex: "queueLength",
      key: "queueLength",
    },
    {
      title: "Status",
      dataIndex: "playerStatus",
      key: "playerStatus",
      render: (status: string) => <Tag color="processing">{status}</Tag>,
    },
  ];

  return (
    <Card title="Sessions" style={{ margin: 24 }}>
      <Table
        columns={columns}
        dataSource={sessions}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </Card>
  );
}
