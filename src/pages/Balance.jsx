
import { useEffect, useState } from 'react';
import { Card, Typography, Spin, message } from 'antd';
import api from '../api/axios';

const { Title, Text } = Typography;

const Balance = () => {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBalance = async () => {
    try {
      const res = await api.get('/balance');
      setBalance(res.data.balance || 0);
    } catch (err) {
      message.error(err.response?.data?.error || 'Failed to fetch balance');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      padding: '2rem',
      minHeight: '70vh',
      backgroundColor: '#f0f2f5',
    }}>
      <Card
        style={{ width: 400, textAlign: 'center', borderRadius: '8px' }}
        bordered={false}
        hoverable
      >
        <Title level={3}>Loyalty Balance</Title>

        {loading ? (
          <Spin tip="Loading your balance..." size="large" />
        ) : (
          <Text style={{ fontSize: '1.5rem' }}>
            Your balance is: <strong>{balance} points</strong>
          </Text>
        )}
      </Card>
    </div>
  );
};

export default Balance;
