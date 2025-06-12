// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   return (
//     <nav style={{ padding: '1rem', background: '#f0f0f0' }}>
//       <Link to="/" style={{ marginRight: '1rem' }}>Login</Link>
//       <Link to="/balance" style={{ marginRight: '1rem' }}>Balance</Link>
//       <Link to="/earn" style={{ marginRight: '1rem' }}>Earn</Link>
//       <Link to="/redeem" style={{ marginRight: '1rem' }}>Redeem</Link>
//       <Link to="/history">History</Link>
//     </nav>
//   );
// };

// export default Navbar;


import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Button, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  const showDrawer = () => setVisible(true);
  const closeDrawer = () => setVisible(false);

  const menuItems = [
    { label: <Link to="/">Login</Link>, key: '/' },
    { label: <Link to="/balance">Balance</Link>, key: '/balance' },
    { label: <Link to="/earn">Earn</Link>, key: '/earn' },
    { label: <Link to="/redeem">Redeem</Link>, key: '/redeem' },
    { label: <Link to="/history">History</Link>, key: '/history' },
  ];

  return (
    <>
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.5rem 1rem',
        backgroundColor: '#001529', // AntD default dark header color
      }}>
        <div style={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>
          Loyalty App
        </div>

        {/* Desktop Menu */}
        <div className="desktop-menu" style={{ flexGrow: 1, marginLeft: '2rem' }}>
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[location.pathname]}
            items={menuItems}
            style={{ borderBottom: 'none' }}
          />
        </div>

        {/* Mobile Hamburger */}
        <Button
          className="mobile-menu-button"
          type="primary"
          icon={<MenuOutlined />}
          onClick={showDrawer}
          style={{ display: 'none' }} // hidden by default
        />
      </nav>

      {/* Mobile Drawer */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={closeDrawer}
        visible={visible}
        bodyStyle={{ padding: 0 }}
        headerStyle={{ backgroundColor: '#001529', color: 'white' }}
      >
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={closeDrawer}
        />
      </Drawer>

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-menu-button {
            display: inline-block !important;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
