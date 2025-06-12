
import { useState } from 'react';
import { Form, InputNumber, Button, Card, Typography, message } from 'antd';
import api from '../api/axios';

const { Title } = Typography;

const Redeem = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await api.post('/redeem', { points: values.points });
      message.success(response.data.message || 'Points redeemed successfully!');
    } catch (err) {
      message.error(err.response?.data?.error || 'Error redeeming points');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
        backgroundColor: '#f0f2f5',
        padding: '1rem',
      }}
    >
      <Card
        style={{ width: 360, borderRadius: '8px' }}
        bordered={false}
        bodyStyle={{ padding: '2rem' }}
      >
        <Title level={2} style={{ textAlign: 'center', marginBottom: '2rem' }}>
          Redeem Loyalty Points
        </Title>

        <Form
          name="redeem_form"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Points to Redeem"
            name="points"
            rules={[
              { required: true, message: 'Please enter points to redeem!' },
              {
                type: 'number',
                min: 1,
                message: 'Points must be at least 1',
                transform: (value) => Number(value),
              },
            ]}
          >
            <InputNumber
              style={{ width: '100%' }}
              placeholder="Enter points"
              min={1}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              style={{ borderRadius: '4px' }}
            >
              Redeem
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Redeem;
