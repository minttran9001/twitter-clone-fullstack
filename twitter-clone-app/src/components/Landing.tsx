import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/icons8-twitter-100.png";

export const Landing = () => {
  return (
    <Container fluid style={{ height: "100vh" }}>
      <Row className="h-100">
        <Col
          className="text-white d-md-flex d-none   flex-column align-items-center justify-content-center"
          style={{ background: "#78A1D1" }}
        >
          <div className="left">
            <div className="d-flex my-3 align-items-center">
              <svg
                style={{ width: 20 }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <strong className="ml-2 fw-bolder">Follow your interests</strong>
            </div>
            <div className="d-flex  my-3 align-items-center">
              <svg
                style={{ width: 20 }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <strong className="ml-2 fw-bolder">
                Hear what people talk about you
              </strong>
            </div>
            <div className="d-flex  my-3 align-items-center">
              <svg
                style={{ width: 20 }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <strong className="ml-2 fw-bolder">Join the conversation</strong>
            </div>
          </div>
        </Col>
        <Col className=" d-flex flex-column align-items-center justify-content-center">
          <div className="right d-flex flex-column w-50">
            <div>
              <img src={logo} alt="Logo" />
            </div>
            <h4>
              <strong>See what happen in the world right now</strong>
            </h4>
            <small>Join Twitter Today.</small>
            <NavLink className="my-2 text-decoration-none" to="/signup">
              <button
                style={{ background: "#78A1D1" }}
                className="w-100 text-white form-control"
              >
                Sign up
              </button>
            </NavLink>
            <NavLink className='text-decoration-none' to="login">
              <button
                style={{ color: "#78A1D1" }}
                className="w-100 form-control border-dark border-2"
              >
                Login
              </button>
            </NavLink>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
