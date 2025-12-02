'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { LoadAuthDiscordProviderByCode } from '@/requests/discord/auth-callback';
import { Spin, Typography, Button } from 'antd';

const { Title } = Typography;

export default function DiscordCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState(false);

  useEffect(() => {
    const code = searchParams.get('code');
    
    if (code) {
      LoadAuthDiscordProviderByCode(code)
        .then((result) => {
          console.log('Auth successful:', result);
          router.push('/sessions');
        })
        .catch((error) => {
          console.error('Auth failed:', error);
          setError(true);
          setTimeout(() => router.push('/'), 3000);
        });
    }
  }, [searchParams, router]);

  if (error) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      }}>
        <Title level={2} style={{ color: 'white', textAlign: 'center', marginBottom: '24px' }}>
          ❌ Erro na Autenticação
        </Title>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', marginBottom: '24px' }}>
          Ocorreu um erro ao conectar com o Discord
        </p>
        <Button 
          type="primary" 
          onClick={() => router.push('/')}
          style={{ background: '#5865F2', borderColor: '#5865F2' }}
        >
          Voltar ao Início
        </Button>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    }}>
      <Spin size="large" style={{ marginBottom: '24px' }} />
      <Title level={2} style={{ color: 'white', textAlign: 'center' }}>
        🎵 Conectando com Discord...
      </Title>
      <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px' }}>
        Aguarde enquanto processamos sua autenticação
      </p>
    </div>
  );
}