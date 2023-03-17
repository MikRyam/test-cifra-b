import React, { FC, useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useTranslation } from 'react-i18next';
import './App.css';
import Header from './components/Header';
import { Button, Row, Table } from 'react-bootstrap';
import { ModalContext } from './context/ModalContext';
import ModalWindow, { IProduct } from './components/ModalWindow';
import Container from 'react-bootstrap/Container';

export const App: FC = () => {
  const { t } = useTranslation();
  const { modal, openModal } = useContext(ModalContext);
  const [itemsInStock, setItemsInStock] = useState<IProduct[] | []>(() => {
    const savedItems = localStorage.getItem('items');
    return savedItems ? JSON.parse(savedItems) : [];
  });

  useEffect(() => {
    // @ts-ignore
    const itemsStored = JSON.parse(localStorage.getItem('items'));
    if (itemsStored) {
      setItemsInStock(itemsStored);
    }
  }, []);

  useEffect(() => {
    console.log('### itemsInStock: ', itemsInStock);
    localStorage.setItem('items', JSON.stringify(itemsInStock));
  }, [itemsInStock]);

  return (
    <div className="App">
      <Header />
      <Container className="h-100 w-auto my-4 py-5 overflow-hidden rounded text-start text-dark">
        <Row className="h-100 px-3 bg-white d-flex align-items-center overflow-hidden ">
          <Table hover>
            <thead>
              <tr>
                <th>{t('table.number')}</th>
                <th>{t('table.title')}</th>
                <th>{t('table.price')}</th>
                <th>{t('table.dateAndTime')}</th>
              </tr>
            </thead>
            <tbody>
              {itemsInStock &&
                itemsInStock.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.title}</td>
                    <td>{item.price}</td>
                    <td className="flex-column">
                      <div>{item.date}</div>
                      <div>{item.time}</div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Row>
      </Container>

      {modal && <ModalWindow set={setItemsInStock} />}
      <Button
        style={{
          bottom: '20px',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '250px',
        }}
        className="position-fixed"
        variant="danger"
        onClick={openModal}
      >
        {t('buttons.newItem')}
      </Button>
    </div>
  );
};

export default App;
