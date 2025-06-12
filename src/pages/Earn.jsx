// import { useState } from 'react';
// import api from '../api/axios';

// const Earn = () => {
//   const [points, setPoints] = useState('');

//   const handleEarn = async () => {
//     try {
//       const response = await api.post('/earn', { points: Number(points) });
//       alert(response.data.message || 'Points earned successfully!');
//       setPoints('');
//     } catch (err) {
//       alert(err.response?.data?.error || 'Error earning points');
//     }
//   };

//   return (
//     <div>
//       <h2>Earn Loyalty Points</h2>
//       <input
//         type="number"
//         placeholder="Enter points"
//         value={points}
//         onChange={(e) => setPoints(e.target.value)}
//       />
//       <button onClick={handleEarn}>Earn</button>
//     </div>
//   );
// };

// export default Earn;


import { useState } from 'react';
import { Card, Typography, InputNumber, Button, message } from 'antd';
import api from '../api/axios';

const { Title } = Typography;

const Earn = () => {
  const [points, setPoints] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEarn = async () => {
    if (!points || points <= 0) {
      return message.warning('Please enter a positive number of points');
    }

    setLoading(true);
    try {
      const response = await api.post('/earn', { points });
      message.success(response.data.message || 'Points earned successfully!');
      setPoints(null);
    } catch (err) {
      message.error(err.response?.data?.error || 'Error earning points');
    } finally {
      setLoading(false);
    }
  };

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
        <Title level={3}>Earn Loyalty Points</Title>

        <InputNumber
          style={{ width: '100%', marginBottom: 16 }}
          min={1}
          placeholder="Enter points"
          value={points}
          onChange={value => setPoints(value)}
          disabled={loading}
        />

        <Button
          type="primary"
          onClick={handleEarn}
          loading={loading}
          block
          disabled={!points || points <= 0}
        >
          Earn
        </Button>
      </Card>
    </div>
  );
};

export default Earn;
