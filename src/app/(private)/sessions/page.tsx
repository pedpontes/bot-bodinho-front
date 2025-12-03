"use client";

import { LoadQueueByUserResponse } from "@/interfaces/session";
import { UploadModel } from "@/interfaces/upload";
import { LoadQueueByUserRequest } from "@/requests/sessions/load-queue-by-user";
import { AddUploadRequest } from "@/requests/upload/add-upload";
import { LoadUploadsPaginationRequest } from "@/requests/upload/load-upload-pagination";
import { PlayUploadByIdRequest } from "@/requests/upload/play-upload-by-id";
import {
  CloudUploadOutlined,
  PlayCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Empty,
  List,
  message,
  Space,
  Spin,
  Tabs,
  Tag,
  Typography,
  Upload,
} from "antd";
import type { UploadProps } from "antd";
import { useCallback, useEffect, useState } from "react";

export default function SessionsPage() {
  const [queueData, setQueueData] = useState<LoadQueueByUserResponse | null>(
    null
  );
  const [queueLoading, setQueueLoading] = useState(false);

  const [uploads, setUploads] = useState<UploadModel[]>([]);
  const [uploadsPage, setUploadsPage] = useState(1);
  const [uploadsLimit] = useState(10);
  const [uploadsTotal, setUploadsTotal] = useState(0);
  const [uploadsLoading, setUploadsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [playingUploadId, setPlayingUploadId] = useState<string | null>(null);

  const { Title, Paragraph, Text } = Typography;

  const loadQueue = useCallback(async () => {
    try {
      setQueueLoading(true);
      const data = await LoadQueueByUserRequest();
      setQueueData(data);
    } catch (error) {
      console.error("Erro ao carregar fila:", error);
      message.error("Não foi possível carregar a fila de músicas.");
    } finally {
      setQueueLoading(false);
    }
  }, []);

  const loadUploads = useCallback(
    async (page: number) => {
      try {
        setUploadsLoading(true);
        const data = await LoadUploadsPaginationRequest({
          filters: {},
          orderBy: { createdAt: "desc" },
          page,
          limit: uploadsLimit,
          search: "",
        });

        setUploads(data.data ?? []);
        setUploadsPage(data.page ?? page);
        setUploadsTotal(
          typeof data.count === "object" && data.count && "total" in data.count
            ? (data.count.total as number)
            : data.data.length
        );
      } catch (error) {
        console.error("Erro ao carregar uploads:", error);
        message.error("Não foi possível carregar seus uploads.");
        setUploads([]);
      } finally {
        setUploadsLoading(false);
      }
    },
    [uploadsLimit]
  );

  useEffect(() => {
    loadQueue();
    loadUploads(1);
  }, [loadQueue, loadUploads]);

  const handleUpload: UploadProps["customRequest"] = async (options) => {
    const { file, onError, onSuccess } = options;

    try {
      setUploading(true);
      await AddUploadRequest(file as File);
      message.success("Upload realizado com sucesso.");
      await loadUploads(1);
      onSuccess?.("ok");
    } catch (error) {
      console.error("Erro ao fazer upload:", error);
      message.error("Erro ao fazer upload do arquivo.");
      onError?.(error as Error);
    } finally {
      setUploading(false);
    }
  };

  const handlePlayUpload = async (uploadId: string) => {
    try {
      setPlayingUploadId(uploadId);
      await PlayUploadByIdRequest(uploadId);
      message.success("Pedido para tocar enviado ao bot.");
    } catch (error) {
      console.error("Erro ao tocar upload:", error);
      message.error("Não foi possível enviar o áudio para tocar.");
    } finally {
      setPlayingUploadId(null);
    }
  };

  const cardStyle: React.CSSProperties = {
    background: "rgba(15,23,42,0.95)",
    borderRadius: 16,
    border: "1px solid rgba(148,163,184,0.35)",
    boxShadow: "0 18px 45px rgba(15,23,42,0.9)",
  };

  useEffect(() => {
    // Recarrega fila de forma periódica leve (feedback vivo)
    const intervalId = setInterval(() => {
      loadQueue();
    }, 30_000);

    return () => clearInterval(intervalId);
  }, [loadQueue]);

  return (
    <div
      style={{
        minHeight: "calc(100vh - 64px)",
        padding: "32px 24px 48px",
        background:
          "radial-gradient(circle at top, #020617 0%, #020617 35%, #000000 100%)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Space
          direction="vertical"
          size="small"
          style={{ width: "100%", marginBottom: 24 }}
        >
          <Title
            level={2}
            style={{
              color: "#E5E7EB",
              margin: 0,
            }}
          >
            Painel do Bot
          </Title>
          <Paragraph style={{ color: "#9CA3AF", margin: 0 }}>
            Visualize a fila atual de músicas e gerencie seus uploads de áudio.
          </Paragraph>
        </Space>

        <Tabs
          defaultActiveKey="queue"
          tabBarStyle={{
            borderBottom: "1px solid rgba(55,65,81,0.8)",
          }}
          items={[
            {
              key: "queue",
              label: (
                <Text style={{ color: "#E5E7EB" }}>Fila de músicas</Text>
              ),
              children: (
                <Card style={cardStyle} bodyStyle={{ padding: 24 }}>
                  <Space
                    direction="vertical"
                    size="large"
                    style={{ width: "100%" }}
                  >
                    <Space
                      align="center"
                      style={{
                        width: "100%",
                        justifyContent: "space-between",
                      }}
                    >
                      <Space align="center">
                        <Tag
                          color={
                            queueData?.explaned === "connected"
                              ? "green"
                              : "red"
                          }
                          style={{
                            borderRadius: 999,
                            paddingInline: 12,
                            fontWeight: 500,
                          }}
                        >
                          {queueData?.explaned === "connected"
                            ? "Conectado"
                            : "Desconectado"}
                        </Tag>
                        <Text style={{ color: "#9CA3AF" }}>
                          {queueData?.explaned === "connected"
                            ? "O Bot Bodinho está conectado ao seu canal de voz."
                            : "O bot ainda não está conectado a um canal de voz."}
                        </Text>
                      </Space>
                      <Button
                        icon={<SyncOutlined />}
                        onClick={loadQueue}
                        loading={queueLoading}
                      >
                        Atualizar fila
                      </Button>
                    </Space>

                    {queueLoading ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: "48px 0",
                        }}
                      >
                        <Spin tip="Carregando fila..." />
                      </div>
                    ) : queueData?.explaned === "disconnected" ? (
                      <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description={
                          <span style={{ color: "#9CA3AF" }}>
                            O Bot Bodinho não está conectado a nenhum canal de
                            voz. <br />
                            Entre em um canal de voz no Discord e use o comando
                            para conectar o bot.
                          </span>
                        }
                      />
                    ) : queueData && queueData.queue.length > 0 ? (
                      <List
                        itemLayout="horizontal"
                        dataSource={queueData.queue}
                        renderItem={(music, index) => (
                          <List.Item
                            style={{
                              background: "rgba(15,23,42,0.9)",
                              borderRadius: 12,
                              padding: 12,
                              marginBottom: 8,
                              border: "1px solid rgba(75,85,99,0.6)",
                            }}
                          >
                            <List.Item.Meta
                              avatar={
                                <div
                                  style={{
                                    width: 56,
                                    height: 56,
                                    borderRadius: 12,
                                    overflow: "hidden",
                                    background: "#020617",
                                  }}
                                >
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                    src={music.thumbnail}
                                    alt={music.title ?? "Capa da música"}
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                    }}
                                  />
                                </div>
                              }
                              title={
                                <Space align="center">
                                  <Text
                                    type="secondary"
                                    style={{ color: "#6B7280" }}
                                  >
                                    #{index + 1}
                                  </Text>
                                  <Text
                                    strong
                                    style={{ color: "#E5E7EB" }}
                                  >
                                    {music.title ?? "Sem título"}
                                  </Text>
                                </Space>
                              }
                              description={
                                <Text style={{ color: "#9CA3AF" }}>
                                  {music.artist ?? "Artista desconhecido"}
                                  {music.album
                                    ? ` • ${music.album}`
                                    : ` • Canal: ${music.channelId}`}
                                </Text>
                              }
                            />
                          </List.Item>
                        )}
                      />
                    ) : (
                      <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description={
                          <span style={{ color: "#9CA3AF" }}>
                            Nenhuma música na fila no momento.
                          </span>
                        }
                      />
                    )}
                  </Space>
                </Card>
              ),
            },
            {
              key: "uploads",
              label: (
                <Text style={{ color: "#E5E7EB" }}>Uploads de áudio</Text>
              ),
              children: (
                <Space direction="vertical" size="large" style={{ width: "100%" }}>
                  <Card style={cardStyle} bodyStyle={{ padding: 24 }}>
                    <Space
                      direction="vertical"
                      size="middle"
                      style={{ width: "100%" }}
                    >
                      <Space direction="vertical" size={4}>
                        <Text style={{ color: "#E5E7EB", fontSize: 16 }}>
                          Suba seus áudios
                        </Text>
                        <Text style={{ color: "#9CA3AF" }}>
                          Arraste arquivos de áudio aqui ou clique para
                          selecionar. Os arquivos serão enviados para o Bot
                          Bodinho.
                        </Text>
                      </Space>

                      <Upload.Dragger
                        multiple
                        showUploadList={false}
                        customRequest={handleUpload}
                        accept="audio/*"
                        disabled={uploading}
                        style={{
                          background: "rgba(15,23,42,0.9)",
                          borderRadius: 14,
                          border: "1px dashed rgba(75,85,99,0.9)",
                          padding: "32px 16px",
                        }}
                      >
                        <Space
                          direction="vertical"
                          size="small"
                          style={{ color: "#9CA3AF" }}
                        >
                          <CloudUploadOutlined
                            style={{ fontSize: 32, color: "#A855F7" }}
                          />
                          <Text style={{ color: "#E5E7EB" }}>
                            Arraste e solte arquivos de áudio
                          </Text>
                          <Text style={{ color: "#6B7280", fontSize: 12 }}>
                            Formatos comuns como MP3, WAV, OGG, etc.
                          </Text>
                        </Space>
                      </Upload.Dragger>
                    </Space>
                  </Card>

                  <Card style={cardStyle} bodyStyle={{ padding: 24 }}>
                    <Space
                      direction="vertical"
                      size="middle"
                      style={{ width: "100%" }}
                    >
                      <Space
                        align="center"
                        style={{
                          width: "100%",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={{ color: "#E5E7EB", fontSize: 16 }}>
                          Seus uploads
                        </Text>
                        <Tag
                          color="purple"
                          style={{
                            borderRadius: 999,
                            paddingInline: 12,
                            fontWeight: 500,
                          }}
                        >
                          {uploadsTotal} arquivos
                        </Tag>
                      </Space>

                      <List
                        dataSource={uploads}
                        loading={uploadsLoading}
                        locale={{
                          emptyText: (
                            <Empty
                              image={Empty.PRESENTED_IMAGE_SIMPLE}
                              description={
                                <span style={{ color: "#9CA3AF" }}>
                                  Nenhum upload encontrado ainda.
                                </span>
                              }
                            />
                          ),
                        }}
                        pagination={{
                          current: uploadsPage,
                          pageSize: uploadsLimit,
                          total: uploadsTotal,
                          onChange: (page) => loadUploads(page),
                          showSizeChanger: false,
                        }}
                        renderItem={(upload) => (
                          <List.Item
                            style={{
                              background: "rgba(15,23,42,0.9)",
                              borderRadius: 12,
                              padding: 16,
                              marginBottom: 10,
                              border: "1px solid rgba(75,85,99,0.6)",
                            }}
                            actions={[
                              <Button
                                key="play"
                                type="link"
                                icon={<PlayCircleOutlined />}
                                onClick={() => handlePlayUpload(upload.id)}
                                loading={playingUploadId === upload.id}
                                style={{ color: "#A855F7" }}
                              >
                                Tocar no servidor
                              </Button>,
                            ]}
                          >
                            <List.Item.Meta
                              title={
                                <Text style={{ color: "#E5E7EB" }}>
                                  {upload.filename}
                                </Text>
                              }
                              description={
                                <Text style={{ color: "#9CA3AF" }}>
                                  Enviado em{" "}
                                  {new Date(upload.createdAt).toLocaleString()}
                                </Text>
                              }
                            />
                            <div>
                              <Text style={{ color: "#6B7280", fontSize: 12 }}>
                                {upload.size
                                  ? `${(upload.size / 1024 / 1024).toFixed(
                                      2
                                    )} MB`
                                  : "Tamanho desconhecido"}
                              </Text>
                            </div>
                          </List.Item>
                        )}
                      />
                    </Space>
                  </Card>
                </Space>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
