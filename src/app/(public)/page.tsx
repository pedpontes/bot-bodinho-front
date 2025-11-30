'use client';

import { Button, Card, Typography, Space, Row, Col, Divider } from 'antd';
import { PlayCircleOutlined, SoundOutlined, TeamOutlined, RocketOutlined, BarChartOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Title, Paragraph, Text } = Typography;

export default function HomePage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '0 24px',
      position: 'relative'
    }}>
      {/* Top Right Button */}
      <div style={{ position: 'absolute', top: '24px', right: '24px', zIndex: 10 }}>
        <Link href="/sessions">
          <Button 
            type="primary" 
            icon={<BarChartOutlined />}
            style={{ 
              background: 'rgba(255,255,255,0.2)', 
              borderColor: 'rgba(255,255,255,0.3)',
              backdropFilter: 'blur(10px)'
            }}
          >
            Acessar Métricas
          </Button>
        </Link>
      </div>
      {/* Hero Section */}
      <div style={{ 
        textAlign: 'center', 
        padding: '80px 0 60px',
        color: 'white'
      }}>
        <Title level={1} style={{ 
          color: 'white', 
          fontSize: '4rem', 
          marginBottom: '24px',
          fontWeight: 'bold'
        }}>
          🎵 Bot Bodinho
        </Title>
        <Paragraph style={{ 
          fontSize: '1.5rem', 
          color: 'rgba(255,255,255,0.9)',
          maxWidth: '600px',
          margin: '0 auto 40px'
        }}>
          O melhor bot de música para Discord. Reproduza suas músicas favoritas com qualidade cristalina.
        </Paragraph>
        <Space size="large">
          <Button 
            type="primary" 
            size="large" 
            icon={<RocketOutlined />}
            style={{ 
              height: '50px', 
              fontSize: '16px',
              background: '#5865F2',
              borderColor: '#5865F2'
            }}
          >
            Adicionar ao Discord
          </Button>
          <Button 
            size="large" 
            ghost
            style={{ 
              height: '50px', 
              fontSize: '16px',
              color: 'white',
              borderColor: 'white'
            }}
          >
            Ver Documentação
          </Button>
        </Space>
      </div>

      {/* Features Section */}
      <Row gutter={[32, 32]} style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '80px' }}>
        <Col xs={24} md={8}>
          <Card 
            style={{ 
              textAlign: 'center', 
              height: '100%',
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
            }}
          >
            <PlayCircleOutlined style={{ fontSize: '48px', color: '#5865F2', marginBottom: '16px' }} />
            <Title level={3}>Reprodução Simples</Title>
            <Paragraph>
              Comandos intuitivos para reproduzir músicas do YouTube, Spotify e outras plataformas.
            </Paragraph>
          </Card>
        </Col>
        
        <Col xs={24} md={8}>
          <Card 
            style={{ 
              textAlign: 'center', 
              height: '100%',
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
            }}
          >
            <SoundOutlined style={{ fontSize: '48px', color: '#5865F2', marginBottom: '16px' }} />
            <Title level={3}>Alta Qualidade</Title>
            <Paragraph>
              Áudio em alta definição com baixa latência para a melhor experiência musical.
            </Paragraph>
          </Card>
        </Col>
        
        <Col xs={24} md={8}>
          <Card 
            style={{ 
              textAlign: 'center', 
              height: '100%',
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
            }}
          >
            <TeamOutlined style={{ fontSize: '48px', color: '#5865F2', marginBottom: '16px' }} />
            <Title level={3}>Fila Colaborativa</Title>
            <Paragraph>
              Todos podem adicionar músicas à fila e votar nas próximas a serem tocadas.
            </Paragraph>
          </Card>
        </Col>
      </Row>

      {/* Commands Section */}
      <div style={{ 
        background: 'rgba(255,255,255,0.1)', 
        borderRadius: '16px',
        padding: '60px 40px',
        maxWidth: '1000px',
        margin: '0 auto 80px',
        backdropFilter: 'blur(10px)'
      }}>
        <Title level={2} style={{ color: 'white', textAlign: 'center', marginBottom: '40px' }}>
          Comandos Principais
        </Title>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '8px' }}>
              <Text code style={{ color: '#00D4AA', fontSize: '16px' }}>/play [música]</Text>
              <br />
              <Text style={{ color: 'rgba(255,255,255,0.8)' }}>Reproduz uma música</Text>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '8px' }}>
              <Text code style={{ color: '#00D4AA', fontSize: '16px' }}>/queue</Text>
              <br />
              <Text style={{ color: 'rgba(255,255,255,0.8)' }}>Mostra a fila de músicas</Text>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '8px' }}>
              <Text code style={{ color: '#00D4AA', fontSize: '16px' }}>/skip</Text>
              <br />
              <Text style={{ color: 'rgba(255,255,255,0.8)' }}>Pula para a próxima música</Text>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '8px' }}>
              <Text code style={{ color: '#00D4AA', fontSize: '16px' }}>/pause</Text>
              <br />
              <Text style={{ color: 'rgba(255,255,255,0.8)' }}>Pausa a reprodução</Text>
            </div>
          </Col>
        </Row>
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', paddingBottom: '40px' }}>
        <Divider style={{ borderColor: 'rgba(255,255,255,0.2)' }} />
        <Text style={{ color: 'rgba(255,255,255,0.6)' }}>
          Bot Bodinho © 2024 - Feito com ❤️ para a comunidade Discord
        </Text>
      </div>
    </div>
  );
}