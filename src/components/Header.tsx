import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="white"
      variant="light"
      className=""
      fixed="top"
    >
      <Container className="flex-row justify-content-between align-items-center pt-2 border-bottom ">
        <p style={{ maxWidth: '20%', textAlign: 'start' }}>STOCK CENTER</p>
        <h5 style={{ color: 'red', marginBottom: '1rem' }}>Items in stock</h5>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          className="justify-content-end flex-grow-0"
          id="responsive-navbar-nav"
        >
          <p style={{ marginRight: 8 }}>Products</p>
          <p>Prices</p>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
