import React from "react";
import { gql, useMutation } from "@apollo/client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import logo from "../assets/images/icons8-twitter-100.png";
import { Col, Container, Row } from "react-bootstrap";
const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;
interface LoginValues {
  email: string;
  password: string;
}
const Login = () => {
  const history = useHistory();
  const [login] = useMutation(LOGIN_MUTATION)
  const initialValues: LoginValues = {
    email: "",
    password: "",
  };
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email required"),
    password: yup
      .string()
      .max(20, "Must be 20 characters or less")
      .required("Password required"),
  });
  const onHandleLogin = (values: LoginValues, setSubmitting: any) => {
    setSubmitting(true);
    login({
      variables: values,
    })
      .then((response) => {
        localStorage.setItem("token", response.data.login.token);
        setSubmitting(false);
        history.push("/");
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <Container>
      <Row>
        <Col>
          <div
            style={{ height: "100vh" }}
            className="w-100  d-flex flex-column align-items-center justify-content-center"
          >
            <img src={logo} alt="Logo" />
            <h2 className="fw-bold">Login To Twitter</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values: LoginValues, { setSubmitting }: any) => {
                onHandleLogin(values, setSubmitting);
              }}
            >
              <Form className=" w-50">
                <Field
                  className="form-control my-2"
                  name="email"
                  type="text"
                  placeholder="Email"
                />
                <ErrorMessage
                  className="text-danger "
                  name="email"
                  component={"small"}
                />
                <Field
                  className="form-control  my-2"
                  name="password"
                  type="password"
                  placeholder="Paswword"
                />
                <ErrorMessage
                  className="text-danger"
                  name="password"
                  component={"small"}
                />
                <button
                  style={{ background: "#78A1D1" }}
                  className=" mt-3 text-white  form-control text-10"
                  type="submit"
                >
                  Log in
                </button>
              </Form>
            </Formik>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default Login;
