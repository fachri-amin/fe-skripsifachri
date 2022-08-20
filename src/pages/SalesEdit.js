import { useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStoreActions } from "easy-peasy";
import MainLayout from "components/MainLayout";
import { useMotorcycleOptions } from "hooks/Motorcycle";
import { useEditSale, useDetailSale } from "hooks/Sales";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import SelectMotorcycle from "components/SelectMotorcycle";

const SchemaValidation = Yup.object().shape({
  motor_detail: Yup.number().required("Sepeda motor wajib diisi"),
  tahun: Yup.string().required("Tahun wajib diisi"),
  harga_baru: Yup.string().required("Harga baru Wajib diisi"),
  harga_bekas: Yup.string().required("Harga bekas Wajib diisi"),
});

const FormInitialValue = {
  motor_detail: "",
  tahun: "",
  harga_baru: "",
  harga_bekas: "",
};

const MotorcycleEdit = () => {
  const { id } = useParams();
  const formikRef = useRef(null);
  const navigate = useNavigate();
  const { mutate, isLoading } = useEditSale(id);
  const { data, filter, filterMotorcycles } = useMotorcycleOptions();
  const { data: detail, isLoading: isLoadingDetail } = useDetailSale(id);
  const setSuccessToast = useStoreActions((actions) => actions.setSuccessToast);
  const setErrorToast = useStoreActions((actions) => actions.setErrorToast);

  const handleFormSubmit = (formValue) => {
    mutate(formValue, {
      onSuccess: (res) => {
        setSuccessToast(res.message);
        navigate("/sales", { replace: true });
      },
      onError: (err) => {
        setErrorToast(err?.response?.data?.message);
      },
    });
  };

  useEffect(() => {
    if (detail?.success) {
      Object.keys(FormInitialValue).forEach((key) => {
        formikRef.current?.setFieldValue(key, detail?.data?.[key]);
        if (key === "motor_detail") {
          formikRef.current?.setFieldValue(key, detail?.data?.[key].id);
        }
      });
    }
  }, [detail]);

  return (
    <MainLayout title="Tambah Penjualan">
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
          setFieldValue,
          setFieldTouched,
          touched,
          errors,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Container>
              <Row>
                <Col lg={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nama Sepeda Motor</Form.Label>
                    {detail && (
                      <>
                        <SelectMotorcycle
                          data={data || []}
                          defaultValue={detail?.data?.motor_detail?.nama}
                          onSelect={(motorcycle) => {
                            setFieldValue("motor_detail", motorcycle.value.id);
                          }}
                        />
                        {errors?.motor_detail && touched?.motor_detail && (
                          <p className="form-error-item-message">
                            {errors?.motor_detail}
                          </p>
                        )}
                      </>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Tahun</Form.Label>
                    <Form.Control
                      disabled={isLoading}
                      name="tahun"
                      type="number"
                      value={values?.tahun}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      isInvalid={errors?.tahun && touched?.tahun}
                    />
                    {errors?.tahun && touched?.tahun && (
                      <p className="form-error-item-message">{errors?.tahun}</p>
                    )}
                  </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Harga Baru</Form.Label>
                    <Form.Control
                      disabled={isLoading}
                      name="harga_baru"
                      type="number"
                      value={values?.harga_baru}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      isInvalid={errors?.harga_baru && touched?.harga_baru}
                    />
                    {errors?.harga_baru && touched?.harga_baru && (
                      <p className="form-error-item-message">
                        {errors?.harga_baru}
                      </p>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Harga Bekas</Form.Label>
                    <Form.Control
                      disabled={isLoading}
                      name="harga_bekas"
                      type="number"
                      value={values?.harga_bekas}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      isInvalid={errors?.harga_bekas && touched?.harga_bekas}
                    />
                    {errors?.harga_bekas && touched?.harga_bekas && (
                      <p className="form-error-item-message">
                        {errors?.harga_bekas}
                      </p>
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
