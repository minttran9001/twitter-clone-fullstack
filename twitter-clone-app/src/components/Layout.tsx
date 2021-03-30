import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavbarLeft from "./NavbarLeft";
import SidebarRight from "./SidebarRight";

export interface Children {
  children: React.ReactNode;
}

const Layout = ({ children }: Children) => {
  return (
    <Container fluid className="profile w-100 ">
      <Row>
        <Col
          style={{ height: "100vh" }}
          className="h-100 border-grey border-right"
          md={3}
        >
          <NavbarLeft />
        </Col>
        <Col className="p-0 content-wrap   text-white h-100 position-relative" md={6}>
          <div className="content">
          {children}
          </div>
        </Col>
        <Col
          style={{ height: "100vh" }}
          md={3}

          className="h-100 border-grey border-left d-none d-md-flex"
        >
          <SidebarRight/>
        </Col>
      </Row>
    </Container>
  );
};
export default Layout;
