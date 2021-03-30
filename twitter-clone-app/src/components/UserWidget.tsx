import React from "react";
import { ButtonGroup, Dropdown } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { ME_QUERY } from "../pages/Profile";
import Loading from "./Loading";
const UserWidget = () => {
  const history = useHistory();
  const handleLogout = async () => {
    localStorage.removeItem("token");
    history.push("/landing");
  };
  const { loading, error, data } = useQuery(ME_QUERY);
  if (loading) return <Loading/>
  if(error) return <p>{error.message}</p>
  return (
    <Dropdown
      as={ButtonGroup}
      key={"up"}
      className="w-100 mt-5 "
      id={`dropdown-button-drop-up`}
      drop={"up"}
      title={` Drop up `}
    >
      <Dropdown.Toggle
        className="bg-transparent border-0 justify-content-between d-flex align-items-center  text-dark"
        id="dropdown-basic"
      >
        <div
          style={{
            width: 50,
            borderRadius: "50%",
            height: 50,
            overflow: "hidden",
          }}
        >
          <img
            className="w-100 h-100"
            style={{
              objectFit: "cover",
            }}
            src={data.me.Profile && data.me.Profile.avatar}
            alt="avatar"
          />
        </div>
        <div className="d-flex ml-3 align-items-start flex-column">
          <strong className="font-weight-bolder">{data.me.name}</strong>
          <small>@{data.me.name +data.me.id}12</small>
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item
          className="border-bottom py-4"
          style={{ fontSize: 20 }}
          href="#"
        >
          <strong>{data.me.name}</strong>
        </Dropdown.Item>
        <Dropdown.Item href="#">Add an existing account</Dropdown.Item>
        <Dropdown.Item onClick={handleLogout} href="#">
          Log out @{data.me.name + data.me.id}12
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
export default UserWidget;
