import React from "react";
import MainLayout from "../components/MainLayout";
import { Button, Col, Container, Row, Modal, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  jenisOptions,
  merkOptions,
  transmisiOptions,
} from "../constant/prediction";
import { usePrediction } from "../hooks";

const SchemaValidation = Yup.object().shape({
  volume_silinder: Yup.string().required("Username Wajib diisi"),
  jumlah_silinder: Yup.string().required("Kata sandi wajib di isi"),
  tahun: Yup.string().required("Kata sandi wajib di isi"),
  harga_baru: Yup.string().required("Kata sandi wajib di isi"),
  merk: Yup.string().required("Kata sandi wajib di isi"),
  transmisi: Yup.string().required("Kata sandi wajib di isi"),
  jenis: Yup.string().required("Kata sandi wajib di isi"),
});

const FormInitialValue = {
  volume_silinder: "",
  jumlah_silinder: "",
  tahun: "",
  harga_baru: "",
  merk: "",
  transmisi: "",
  jenis: "",
};

const Home = () => {
  const formikRef = React.useRef(null);
  const [show, setShow] = React.useState(false);
  const { mutate, isLoading } = usePrediction();
  const [pricePrediction, setPricePrediction] = React.useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleFormSubmit = (formValue) => {
    mutate(formValue, {
      onSuccess: (res) => {
        const { price } = res?.data;

        setPricePrediction(price);
        handleShow();
      },
    });
  };

  return (
    <MainLayout title={"Prediksi Harga Sepeda Motor"}>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>
            <h5>Hasil Perdiksi harga</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h1 className="fw-bold text-center">{pricePrediction}</h1>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-primary" onClick={handleClose}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
      <Formik
        initialValues={FormInitialValue}
        innerRef={formikRef}
        validationSchema={SchemaValidation}
        onSubmit={handleFormSubmit}
      >
        {({
          handleSubmit,
          handleBlur,
          handleChange,
          values,
          touched,
          errors,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Container>
              <Row>
                <Col lg={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Volume Silinder</Form.Label>
                    <Form.Control
                      disabled={isLoading}
                      name="volume_silinder"
                      type="number"
                      value={values?.volume_silinder}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Jumlah Silinder</Form.Label>
                    <Form.Control
                      disabled={isLoading}
                      name="jumlah_silinder"
                      type="number"
                      value={values?.jumlah_silinder}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Harga Baru</Form.Label>
                    <Form.Control
                      disabled={isLoading}
                      name="harga_baru"
                      type="number"
                      value={values?.harga_baru}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Tahun Pembuatan</Form.Label>
                    <Form.Control
                      disabled={isLoading}
                      name="tahun"
                      type="number"
                      value={values?.tahun}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Tranmisi</Form.Label>
                    <Form.Select
                      disabled={isLoading}
                      name="transmisi"
                      type="text"
                      value={values?.transmisi}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    >
                      <option>Pilih Transmisi</option>
                      {transmisiOptions.map((option) => (
                        <option value={option.value}>{option.label}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Merk</Form.Label>
                    <Form.Select
                      disabled={isLoading}
                      name="merk"
                      type="text"
                      value={values?.merk}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    >
                      <option>Pilih Merk</option>
                      {merkOptions.map((option) => (
                        <option value={option.value}>{option.label}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Jenis</Form.Label>
                    <Form.Select
                      disabled={isLoading}
                      name="jenis"
                      type="text"
                      value={values?.jenis}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    >
                      <option>Pilih Jenis</option>
                      {jenisOptions.map((option) => (
                        <option value={option.value}>{option.label}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <div className="d-grid gap-2 pt-4">
                      <Button
                        variant="primary"
                        size="lg"
                        disabled={
                          !SchemaValidation.isValidSync(values) || isLoading
                        }
                        type="submit"
                      >
                        Prediksi
                      </Button>
                    </div>
                  </Form.Group>
                </Col>
              </Row>
            </Container>
          </Form>
        )}
      </Formik>
    </MainLayout>
  );
};

export default Home;
