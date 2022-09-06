import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStoreActions } from "easy-peasy";
import MainLayout from "../components/MainLayout";
import { useDetailMotorcycle, useEditMotorcycle } from "../hooks/Motorcycle";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  jenisOptions,
  merkOptions,
  transmisiOptions,
} from "../constant/prediction";

const SchemaValidation = Yup.object().shape({
  nama: Yup.string().required("Username Wajib diisi"),
  merk: Yup.string().required("Kata sandi wajib di isi"),
  volume_silinder: Yup.string().required("Username Wajib diisi"),
  jumlah_silinder: Yup.string().required("Kata sandi wajib di isi"),
  transmisi: Yup.string().required("transmisi wajib di isi"),
  jenis: Yup.string().required("Jenis wajib di isi"),
});

const FormInitialValue = {
  id: "",
  nama: "",
  volume_silinder: "",
  jumlah_silinder: "",
  merk: "",
  transmisi: "",
  jenis: "",
};

const MotorcycleEdit = () => {
  const { id } = useParams();
  const formikRef = useRef(null);
  const navigate = useNavigate();
  const { mutate, isLoading } = useEditMotorcycle(id);
  const { data, isLoading: isLoadingDetail } = useDetailMotorcycle(id);
  const setSuccessToast = useStoreActions((actions) => actions.setSuccessToast);
  const setErrorToast = useStoreActions((actions) => actions.setErrorToast);

  const handleFormSubmit = (formValue) => {
    mutate(formValue, {
      onSuccess: (res) => {
        setSuccessToast(res.message);
        navigate("/motorcycle", { replace: true });
      },
      onError: (err) => {
        setErrorToast(err?.response?.data?.message);
      },
    });
  };

  useEffect(() => {
    if (data?.success) {
      Object.keys(FormInitialValue).forEach((key) => {
        formikRef.current?.setFieldValue(key, data?.data?.[key]);
      });
    }
  }, [data]);

  return (
    <MainLayout title="Tambah Sepeda Motor">
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
                    <Form.Label>Nama Sepeda Motor</Form.Label>
                    <Form.Control
                      disabled={isLoading}
                      name="nama"
                      type="text"
                      value={values?.nama}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      isInvalid={errors?.nama && touched?.nama}
                    />
                    {errors?.nama && touched?.nama && (
                      <p className="form-error-item-message">{errors?.nama}</p>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Volume Silinder</Form.Label>
                    <Form.Control
                      disabled={isLoading}
                      name="volume_silinder"
                      type="number"
                      value={values?.volume_silinder}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      isInvalid={
                        errors?.volume_silinder && touched?.volume_silinder
                      }
                    />
                    {errors?.volume_silinder && touched?.volume_silinder && (
                      <p className="form-error-item-message">
                        {errors?.volume_silinder}
                      </p>
                    )}
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
                      isInvalid={
                        errors?.jumlah_silinder && touched?.jumlah_silinder
                      }
                    />
                    {errors?.jumlah_silinder && touched?.jumlah_silinder && (
                      <p className="form-error-item-message">
                        {errors?.jumlah_silinder}
                      </p>
                    )}
                  </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Merk</Form.Label>
                    <Form.Select
                      disabled={isLoading}
                      name="merk"
                      type="text"
                      value={values?.merk}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      isInvalid={errors?.merk && touched?.merk}
                    >
                      <option>Pilih Merk</option>
                      {merkOptions.map((option) => (
                        <option value={option.value}>{option.label}</option>
                      ))}
                    </Form.Select>
                    {errors?.merk && touched?.merk && (
                      <p className="form-error-item-message">{errors?.merk}</p>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Tranmisi</Form.Label>
                    <Form.Select
                      disabled={isLoading}
                      name="transmisi"
                      type="text"
                      value={values?.transmisi}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      isInvalid={errors?.transmisi && touched?.transmisi}
                    >
                      <option>Pilih Transmisi</option>
                      {transmisiOptions.map((option) => (
                        <option value={option.value}>{option.label}</option>
                      ))}
                    </Form.Select>
                    {errors?.transmisi && touched?.transmisi && (
                      <p className="form-error-item-message">
                        {errors?.transmisi}
                      </p>
                    )}
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
                      isInvalid={errors?.jenis && touched?.jenis}
                    >
                      <option>Pilih Jenis</option>
                      {jenisOptions.map((option) => (
                        <option value={option.value}>{option.label}</option>
                      ))}
                    </Form.Select>
                    {errors?.jenis && touched?.jenis && (
                      <p className="form-error-item-message">{errors?.jenis}</p>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col lg={3}>
                  <div className="d-grid gap-2 pt-4">
                    <Button
                      variant="primary"
                      size="lg"
                      disabled={
                        !SchemaValidation.isValidSync(values) || isLoading
                      }
                      type="submit"
                    >
                      Simpan
                    </Button>
                  </div>
                </Col>
              </Row>
            </Container>
          </Form>
        )}
      </Formik>
    </MainLayout>
  );
};

export default MotorcycleEdit;
