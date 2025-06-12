import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Earn from './pages/Earn';
import Redeem from './pages/Redeem';
import Balance from './pages/Balance';
import History from './pages/History';
import Navbar from './components/Navbar';

function AppRoutes() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/earn" element={<Earn />} />
        <Route path="/redeem" element={<Redeem />} />
        <Route path="/balance" element={<Balance />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
