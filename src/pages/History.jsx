
import { useEffect, useState } from 'react';
import { Card, Table, Typography, Spin, Empty } from 'antd';
import api from '../api/axios';

const { Title } = Typography;

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const res = await api.get('/history');
      setHistory(res.data.transactions || []);
    } catch (err) {
      // Better user feedback with a message or modal could be added here
      alert(err.response?.data?.error || 'Failed to fetch history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // Define columns for AntD Table
  const columns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      sorter: (a, b) => a.type.localeCompare(b.type),
      filters: [
        { text: 'Earn', value: 'earn' },
        { text: 'Redeem', value: 'redeem' },
      ],
      onFilter: (value, record) => record.type.toLowerCase() === value,
      render: text => text.charAt(0).toUpperCase() + text.slice(1),
    },
    {
      title: 'Points',
      dataIndex: 'points',
      key: 'points',
      sorter: (a, b) => a.points - b.points,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      render: date => new Date(date).toLocaleString(),
    },
  ];

  return (
    <div style={{ padding: '2rem', minHeight: '70vh', backgroundColor: '#f0f2f5' }}>
      <Card
        title={<Title level={3}>Transaction History</Title>}
        bordered={false}
        style={{ maxWidth: 800, margin: '0 auto', borderRadius: '8px' }}
        bodyStyle={{ padding: '1rem' }}
      >
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <Spin size="large" />
          </div>
        ) : history.length === 0 ? (
          <Empty description="No transactions found" />
        ) : (
          <Table
            columns={columns}
            dataSource={history}
            rowKey={(record, index) => index}
            pagination={{ pageSize: 5 }}
            bordered
            scroll={{ x: 'max-content' }}
          />
        )}
      </Card>
    </div>
  );
};

export default History;
