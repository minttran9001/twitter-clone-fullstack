import React from "react";
import { Navbar, Nav } from "react-bootstrap";

import { NavLink } from "react-router-dom";
import logo from "../assets/images/icons8-twitter-100.png";
import Tweet from "./Tweet";
import UserWidget from "./UserWidget";
const NavbarLeft = () => {
  return (
    <Navbar
      className="d-flex align-items-start flex-column"
      collapseOnSelect
      expand="lg"
      style={{ height: "100vh" }}
    >
      <Navbar.Brand>
        <NavLink to="/">
          <img src={logo} alt="Logo" />
        </NavLink>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse
        className="d-flex flex-column"
        id="responsive-navbar-nav"
      >
        <Nav className="d-flex   flex-column justify-content-around align-items-start">
          <Nav.Link>
            <NavLink
              activeClassName="activeLink"
              className="d-flex text-decoration-none text-dark align-items-center"
              to="/home"
            >
              <svg
                style={{ width: 30 }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <strong style={{ fontSize: 20 }} className="ml-3">
                Home
              </strong>
            </NavLink>
          </Nav.Link>
          <Nav.Link>
            <NavLink
              activeClassName="activeLink"
              className="text-decoration-none d-flex text-dark align-items-center"
              to="/notifications"
            >
              <svg
                style={{ width: 30 }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <strong className="ml-3" style={{ fontSize: 20 }}>
                Notifications
              </strong>
            </NavLink>
          </Nav.Link>
          <Nav.Link>
            <NavLink
              activeClassName="activeLink"
              className="text-decoration-none d-flex text-dark align-items-center"
              to="/message"
            >
              <svg
                style={{ width: 30 }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <strong className="ml-3" style={{ fontSize: 20 }}>
                Message
              </strong>
            </NavLink>
          </Nav.Link>
          <Nav.Link>
            <NavLink
              activeClassName="activeLink"
              className="text-decoration-none d-flex text-dark align-items-center"
              to="/bookmark"
            >
              <svg
                style={{ width: 30 }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
              <strong className="ml-3" style={{ fontSize: 20 }}>
                Bookmark
              </strong>
            </NavLink>
          </Nav.Link>
          <Nav.Link>
            <NavLink
              activeClassName="activeLink"
              className="text-decoration-none d-flex text-dark align-items-center"
              to="/lists"
            >
              <svg
                style={{ width: 30 }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
              <strong className="ml-3" style={{ fontSize: 20 }}>
                Lists
              </strong>
            </NavLink>
          </Nav.Link>
          <Nav.Link>
            <NavLink
              activeClassName="activeLink"
              className="text-decoration-none d-flex text-dark align-items-center"
              to="/profile"
            >
              <svg
                style={{ width: 30 }}
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
              <strong className="ml-3" style={{ fontSize: 20 }}>
                Profile
              </strong>
            </NavLink>
          </Nav.Link>
          <Nav.Link>
            <NavLink
              activeClassName="activeLink"
              className="text-decoration-none d-flex text-dark align-items-center "
              to="/more"
            >
              <svg
                style={{ width: 30 }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <strong className="ml-3" style={{ fontSize: 20 }}>
                More
              </strong>
            </NavLink>
          </Nav.Link>
          <Tweet />
          <UserWidget />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default NavbarLeft;
