import { useLazyQuery, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { NavLink } from "react-router-dom";
import Trend from "./Trend";
import noavt from "../assets/images/noavt.png";
import { ME_QUERY } from "../pages/Profile";
const FILTER_USER = gql`
  query getUsers($query: String) {
    users(query: $query) {
      id
      name
      Profile {
        avatar
      }
    }
  }
`;

const SidebarRight = () => {
  const [getUsers, { loading, data }] = useLazyQuery(FILTER_USER);
  const { loading: meLoading, error: meError, data: meData } = useQuery(
    ME_QUERY
  );
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();

    getUsers({
      variables: { query: value },
    });
  };
  const [input, setInput] = React.useState(false);
  const handleClick = (e: any) => {
    const input = document.getElementById("filter-input");

    if (input && input.contains(e.target)) {
      setInput(true);
    } else {
      setInput(false);
    }
  };
  React.useEffect(() => {
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);
  return (
    <div className="text-dark px-2 pt-4">
      <div className=" position-relative">
        <div
          id="filter-input"
          style={{ background: "rgba(0,0,0,.1)" }}
          className="d-flex px-4 py-2 rounded d-flex align-items-center"
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
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            autoComplete="off"
            type="text"
            onChange={handleSearch}
            className="w-100 bg-transparent  border-0 ml-4 form-control"
            placeholder="Search Tweet"
          />
        </div>

        {data && input && (
          <div className="d-flex shadow-lg p-3 rounded position-absolute bottom-0 w-100 bg-white flex-column">
            {data.users.length > 0 ? (
              data.users.map((item: any) => (
                <NavLink
                  to={`/user/${item.id}`}
                  className="text-dark py-3 d-flex align-items-center border-bottom border-grey"
                  style={{ textDecoration: "none" }}
                >
                  <div
                    className="overflow-hidden rounded-circle"
                    style={{ width: 50, height: 50 }}
                  >
                    <img
                      className="w-100 h-100"
                      style={{ objectFit: "cover" }}
                      src={
                        item.Profile && item.Profile.avatar
                          ? item.Profile.avatar
                          : noavt
                      }
                      alt="Avatar Filter"
                    />
                  </div>
                  <div className="d-flex ml-3 flex-column align-items-start">
                    <p>
                      {item.name}
                      {meData.me.id === item.id && (
                        <small className="ml-2 text-grey">( You )</small>
                      )}
                    </p>
                    <small className="text-grey">
                      @{item.name + item.id}1233{" "}
                    </small>
                  </div>
                </NavLink>
              ))
            ) : (
              <div className="text-center pt-3 ">
                <svg
                  style={{ width: 50 }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p>Users not found</p>
              </div>
            )}
          </div>
        )}
      </div>
      <div
        style={{ background: "rgba(0,0,0,.03)" }}
        className="rounded mt-4  py-2"
      >
        <div className="d-flex px-4 border-bottom border-gray py-3 justify-content-between align-items-center">
          <strong>Trends for you</strong>
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
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <div className="">
          <Trend />
          <Trend />
          <Trend />
          <Trend />
          <Trend />
        </div>
      </div>
    </div>
  );
};
export default SidebarRight;
