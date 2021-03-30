import { gql, useQuery } from "@apollo/client";
import image from "../assets/images/i-wont-be-5719421e1a.jpg";
import React, { useEffect } from "react";
import Header from "../components/Header";
import { ME_QUERY } from "../pages/Profile";
import TweetCard from "../components/TweetCard";
import { TweetValues } from "./Home";
import Loading from "../components/Loading";
import { useParams } from "react-router";
import Follow from "../components/Follow";
import UnFollow from "../components/UnFollow";
import UpdateProfile from "../components/UpdateProfile";
import CreateProfile from "../components/CreateProfile";
export const USER_QUERY = gql`
  query user($id: Int) {
    user(id: $id) {
      id
      name
      email
      tweets {
        id
        createdAt
        content
        files
        likes {
          id
        }
        comments {
          id
        }
        author {
          id
          name
          Profile {
            id
            avatar
          }
        }
      }
      likedTweet {
        id
        tweet {
          id
        }
      }
      Profile {
        id
        bio
        location
        website
        avatar
      }
    }
  }
`;

interface UserParams {
  id: string;
}
interface FollowerIds {
  followId: number;
  id: number;
}
const SingleUser = () => {
  const { id } = useParams<UserParams>();
  const { loading, error, data } = useQuery(USER_QUERY, {
    variables: { id: parseInt(id) },
  });
  const { loading: meLoading, error: meError, data: meData } = useQuery(
    ME_QUERY
  );
  if (loading) return <Loading />;
  if (error) return <h1>{error.message}</h1>;
  if (meLoading) return <Loading />;
  if (meError) return <p>{meError.message}</p>;
  const idOfFollowers = meData.me.Following.map(
    (follow: FollowerIds) => follow.followId
  );

  const follows = meData.me.Following.map((follow: FollowerIds) => follow);

  const getFollowId = follows.filter(
    (follow: FollowerIds) => follow.followId === data.user.id
  );
  return (
    <>
      <Header>
        <div className="d-flex flex-column ml-4 align-items-start justify-content-center">
          <strong>{data.user.name}</strong>
          <small style={{ fontSize: 12 }}>
            {data.user.tweets.length} Tweets
          </small>
        </div>
      </Header>
      <div className="profile">
        <div style={{ width: "100%", height: "250px", overflow: "hidden" }}>
          <img src={image} className="img-fluid w-100 bg-dark" alt="cover" />
        </div>
        <div className="d-flex w-100 text-dark justify-content-between px-3">
          <div className="d-flex position-relative  align-items-center justify-content-center flex-column">
            <div
              style={{
                width: "200px",
                height: "200px",
                top: "-50%",
              }}
              className="border border-grey ml-5 position-absolute  rounded-circle overflow-hidden"
            >
              {data.user.Profile ? (
                <img
                  src={data.user.Profile.avatar}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                  alt="avatar"
                />
              ) : (
                <svg
                  style={{ width: 150, borderRadius: "50%" }}
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
              )}
            </div>
            <div
              style={{
                transform: "translateY(50%)",
              }}
            >
              <h3 className="text-dark mt-2 fs-1">{data.user.name}</h3>
              <small className="text-grey">{data.user.email}</small>
              <p className="my-1">
                {data.user.Profile ? data.user.Profile.bio : ""}
              </p>
              <div className="d-flex flex-column">
                <div className="d-flex my-2 align-items-center">
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
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <small className="ml-2">
                    {data.user.Profile ? data.user.Profile.location : ""}
                  </small>
                </div>
                <div className="d-flex my-2  align-items-center">
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
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                  <small className="ml-2">
                    <a
                      style={{ color: "#78A1D1" }}
                      href={`https://${
                        data.user.Profile ? data.user.Profile.website : ""
                      }`}
                    >
                      {data.user.Profile ? data.user.Profile.website : ""}
                    </a>
                  </small>
                </div>
                <div className="d-flex my-2  align-items-center">
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
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <small className="ml-2">Join in July 20th 2020</small>
                </div>
              </div>
              <div className="d-flex text-dark">
                <small className="mr-4">
                  <strong className="mr-2">29</strong>Following
                </small>
                <small>
                  <strong className="mr-2">200056</strong>Followers
                </small>
              </div>
            </div>
          </div>
          <div className=" d-flex mt-3">
            {meData.me.id === data.user.id ? (
              <div className="d-flex mt-3">
                {meData.me.Profile && meData.me.Profile.id ? (
                  <UpdateProfile />
                ) : (
                  <CreateProfile />
                )}
              </div>
            ) : !idOfFollowers.includes(data.user.id) ? (
              <>
                <button
                  style={{ border: "1px solid #78A1D1", color: "#78A1D1" }}
                  className="form-control mr-1"
                >
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
                      d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                    />
                  </svg>
                </button>
                <button
                  style={{ border: "1px solid #78A1D1", color: "#78A1D1" }}
                  className=" form-control mr-1 "
                >
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
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </button>
                <Follow
                  id={data.user.id}
                  name={data.user.name}
                  avatar={
                    data.user.Profile && data.user.Profile.avatar
                      ? data.user.Profile.avatar
                      : ""
                  }
                />
              </>
            ) : (
              <>
                <button
                  style={{ border: "1px solid #78A1D1", color: "#78A1D1" }}
                  className="form-control mr-1"
                >
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
                      d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                    />
                  </svg>
                </button>
                <button
                  style={{ border: "1px solid #78A1D1", color: "#78A1D1" }}
                  className=" form-control mr-1 "
                >
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
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </button>
                <UnFollow id={getFollowId[0].id} />
              </>
            )}
          </div>
        </div>
      </div>
      <div className="text-dark" style={{ transform: "translateY(120px)" }}>
        <h5 className="p-3 mt-3">Tweets</h5>
        {data.user.tweets.map((item: any, index: number) => (
          <TweetCard
            key={String(item.createdAt)}
            comments={item.comments}
            userData={meData.me}
            id={item.id}
            files={item.files}
            likes={item.likes ? item.likes : []}
            createdAt={item.createdAt}
            content={item.content}
            authorId={data.user.id}
            name={data.user.name}
            avatar={data.user.Profile.avatar}
          />
        ))}
      </div>
    </>
  );
};
export default SingleUser;
