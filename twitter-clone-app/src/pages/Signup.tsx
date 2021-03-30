import React from "react";
import { gql, useMutation } from "@apollo/client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import logo from "../assets/images/icons8-twitter-100.png";
import { ME_QUERY } from "./Profile";

const SIGNUP_MUTATION = gql`
  mutation signup($name: String, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
    }
  }
`;
interface SignupValues {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
}
const Signup = () => {
  const history = useHistory();
  const [signup] = useMutation(SIGNUP_MUTATION);
  const initialValues: SignupValues = {
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
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
    name: yup
      .string()
      .max(15, "Must be 15 characters or less")
      .required("Name required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password must match"),
  });
  return (
    <div
      style={{ height: "100vh" }}
      className="w-100  d-flex flex-column align-items-center justify-content-center"
    >
      <img src={logo} alt="Logo" />
      <h2 className="fw-bold">Register To Twitter</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async(values, { setSubmitting }) => {
          setSubmitting(true)
					const response = await signup({
						variables: values
					})
					localStorage.setItem("token", response.data.login.token)
					setSubmitting(false)
					history.push("/")
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
            className="text-danger"
            name="email"
            component={"small"}
          />
          <Field
            className="form-control my-2"
            name="name"
            type="text"
            placeholder="Name"
          />
          <ErrorMessage
            className="text-danger"
            name="name"
            component={"small"}
          />
          <Field
            className="form-control my-2"
            name="password"
            type="password"
            placeholder="Paswword"
          />
          <ErrorMessage
            className="text-danger"
            name="password"
            component={"small"}
          />
          <Field
            className="form-control my-2"
            name="confirmPassword"
            type="password"
            placeholder="Confirm Paswword"
          />
          <ErrorMessage
            className="text-danger"
            name="confirmPassword"
            component={"small"}
          />
          <button
            style={{ background: "#78A1D1" }}
            className=" mt-3 text-white form-control text-10"
            type="submit"
          >
            Sign up
          </button>
        </Form>
      </Formik>
    </div>
  );
};
export default Signup;
