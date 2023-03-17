import React, {FC} from 'react';
import { useTranslation } from 'react-i18next';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const Header: FC = () => {
  const { t } = useTranslation();
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
        <p style={{ maxWidth: '20%', textAlign: 'start' }}>{t('header.logoTitle')}</p>
        <h5 style={{ color: 'red', marginBottom: '1rem' }}>{t('header.tableName')}</h5>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          className="justify-content-end flex-grow-0"
          id="responsive-navbar-nav"
        >
          <p style={{ marginRight: 8 }}>{t('header.products')}</p>
          <p>{t('header.prices')}</p>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
