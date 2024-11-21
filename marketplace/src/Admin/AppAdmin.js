import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import Sidebar from './components/Sidebar';
import TopNavbar from './components/TopNavbar';
import Dashboard from './pages/Dashbord';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Login from './pages/Login';

const AppAdmin = () => {
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(true);
  const [showNavbar, setShowNavbar] = useState(true);

  // Correct condition: Hide sidebar and navbar only on the login page
  useEffect(() => {
    
    if (location.pathname === "/") {
      setShowSidebar(false);  // Hide sidebar on login page
      setShowNavbar(false);   // Hide navbar on login page
    } else {
      setShowSidebar(true);   // Show sidebar on other pages
      setShowNavbar(true);    // Show navbar on other pages
    }
  }, [location]);

  return (
    <Container fluid>
      {showNavbar && <TopNavbar />}
      <Row>
        {showSidebar && (
          <Col md={2}>
            <Sidebar />
          </Col>
        )}
        <Col className="p-4">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />
            <Route path="customers" element={<Customers />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
};

export default AppAdmin;
