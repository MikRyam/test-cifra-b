import React, { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as yup from 'yup';
// @ts-ignore
import { v4 as uuid } from 'uuid';
import { Button, Form, Modal } from 'react-bootstrap';
import { ModalContext } from '../context/ModalContext';

export interface IProduct {
  id: string;
  title: string;
  price: string;
  date: string;
  time: string;
}

type SetState = {
  set: React.Dispatch<React.SetStateAction<IProduct[]>>;
};

const ModalWindow: FC<SetState> = ({ set }) => {
  const { t } = useTranslation();
  const { closeModal } = useContext(ModalContext);

  const formValidation = yup.object().shape({
    title: yup
      .string()
      .trim()
      .min(2, 'From 2 to 20 symbols')
      .max(20, 'From 2 to 20 symbols')
      .required('Required'),
    price: yup
      .string()
      .matches(/(^\d*\d+.?(\d{1,2})?$)/, 'Invalid price')
      .required('Invalid price'),
    date: yup.date().required('Required'),
    time: yup.string().required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      price: '',
      date: '',
      time: '',
    },
    validationSchema: formValidation,
    onSubmit: async (values, actions) => {
      try {
        actions.setSubmitting(true);
        const data = {
          ...values,
          id: uuid().slice(0, 8),
          price: Number(values.price).toFixed(2),
          date: values.date.split('-').reverse().join('.'),
        };
        set((value) => [...value, data]);
        actions.setSubmitting(false);
        closeModal();
      } catch (err) {
        actions.setSubmitting(false);
        console.log(err);
        return values;
      }
    },
  });

  return (
    <Modal animation centered show onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title className="text-dark">{t('newItemModal.formTitle')}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-dark">
        <Form id="genNewChannel" noValidate onSubmit={formik.handleSubmit}>
          <Form.Group className="mt-3">
            <Form.Label htmlFor="title">{t('newItemModal.fields.title')}Title</Form.Label>
            <Form.Control
              name="title"
              type="text"
              autoComplete="title"
              placeholder="Title"
              required
              onChange={formik.handleChange}
              value={formik.values.title}
              onBlur={formik.handleBlur}
              isInvalid={!!formik.touched.title && !!formik.errors.title}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.title}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label htmlFor="price">{t('newItemModal.fields.price')}</Form.Label>
            <Form.Control
              name="price"
              type="number"
              autoComplete="price"
              placeholder="Price"
              required
              onChange={formik.handleChange}
              value={formik.values.price}
              onBlur={formik.handleBlur}
              isInvalid={!!formik.touched.price && !!formik.errors.price}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.price}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label htmlFor="dateTime">{t('newItemModal.fields.date')}</Form.Label>
            <Form.Control
              name="date"
              type="date"
              max={new Date().toISOString().slice(0, 10)}
              autoComplete="date"
              placeholder="Date"
              required
              onChange={formik.handleChange}
              value={formik.values.date}
              onBlur={formik.handleBlur}
              isInvalid={!!formik.touched.date && !!formik.errors.date}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.date}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label htmlFor="time">{t('newItemModal.fields.time')}</Form.Label>
            <Form.Control
              name="time"
              type="time"
              step="1"
              max={new Date().toISOString().slice(0, 10)}
              autoComplete="time"
              placeholder="Time"
              required
              onChange={formik.handleChange}
              value={formik.values.time}
              onBlur={formik.handleBlur}
              isInvalid={!!formik.touched.time && !!formik.errors.time}
            />

            <Form.Control.Feedback type="invalid">
              {formik.errors.time}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="mt-4">
        <Button variant="secondary" onClick={closeModal}>
          {t('buttons.close')}
        </Button>
        <Button
          type="submit"
          form="genNewChannel"
          variant="danger"
          disabled={
            !!formik.errors.title ||
            !formik.values.title ||
            formik.isSubmitting ||
            !!formik.errors.price ||
            !formik.values.price ||
            !!formik.errors.date ||
            !formik.values.date ||
            !!formik.errors.time ||
            !formik.values.time
          }
        >
          {t('buttons.addItem')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalWindow;
