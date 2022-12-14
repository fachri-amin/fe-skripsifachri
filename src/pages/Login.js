import React from "react";
import { Button, Col, Container, Row, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { useLogin } from "../hooks";
import { setAuthHeader } from "../services/axios";
import { useStoreActions } from "easy-peasy";

const LoginSchemaValidation = Yup.object().shape({
  username: Yup.string().required("Username Wajib diisi"),
  password: Yup.string().required("Kata sandi wajib di isi"),
});

const Login = () => {
  const setUser = useStoreActions((actions) => actions.setUser);
  const { mutate, isLoading } = useLogin();
  const formikRef = React.useRef(null);
  const navigate = useNavigate();
  const [error, setError] = React.useState(null);

  const handleFormSubmit = (formValue) => {
    setError(null);
    mutate(formValue, {
      onSuccess: (res) => {
        const { token, user } = res?.data;

        setUser({ ...user, token });
        localStorage.setItem("user", JSON.stringify({ ...user, token }));
        setAuthHeader(token);
        navigate("/", { replace: true });
      },
      onError: (err) => {
        setError(err.response.data.message);
      },
    });
  };

  return (
    <div className="bg-login">
      <div
        style={{
          background: "rgba(255, 255, 255, 0.2)",
          position: "absolute",
          top: "0",
          bottom: "0",
          left: "0",
          right: "0",
        }}
      >
        <Container
          className="align-items-center d-flex justify-content-center"
          style={{
            position: "absolute",
            top: "0",
            bottom: "0",
            left: "0",
            right: "0",
          }}
        >
          <Row className="align-items-center justify-content-center">
            <Col lg={6}>
              <h1 className="text-secondary jumbo-text">
                Sistem Prediksi Harga Sepeda Motor Bekas
                <br /> di Kota Medan
              </h1>
              <h4 className="text-primary">Dzakir Motor</h4>
            </Col>
            <Col lg={6}>
              <Card className="bg-secondary">
                <Card.Body>
                  <h3 className="text-center text-white">LOGIN</h3>
                  <Formik
                    initialValues={{ username: "", password: "" }}
                    innerRef={formikRef}
                    validationSchema={LoginSchemaValidation}
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
                      <Form
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleSubmit();
                          }
                        }}
                        onSubmit={handleSubmit}
                      >
                        <Form.Group className="mb-3">
                          <Form.Label className="text-white">
                            Username
                          </Form.Label>
                          <Form.Control
                            disabled={isLoading}
                            name="username"
                            type="text"
                            value={values?.username}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            isInvalid={errors?.username && touched?.username}
                          />
                          {errors?.username && touched?.username && (
                            <p className="form-error-item-message mt-1">
                              {errors?.username}
                            </p>
                          )}
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label className="text-white">
                            Password
                          </Form.Label>
                          <Form.Control
                            disabled={isLoading}
                            name="password"
                            type="password"
                            value={values?.password}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            isInvalid={errors?.password && touched?.password}
                          />
                          {errors?.password && touched?.password && (
                            <p className="form-error-item-message mt-1">
                              {errors?.password}
                            </p>
                          )}
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        ></Form.Group>
                        <div className="d-grid gap-2">
                          <Button
                            variant="primary"
                            size="lg"
                            disabled={
                              !LoginSchemaValidation.isValidSync(values) ||
                              isLoading
                            }
                            type="submit"
                          >
                            Masuk
                          </Button>
                        </div>
                        {error && (
                          <p className="form-error-item-message mt-2">
                            {error}
                          </p>
                        )}
                      </Form>
                    )}
                  </Formik>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Login;
