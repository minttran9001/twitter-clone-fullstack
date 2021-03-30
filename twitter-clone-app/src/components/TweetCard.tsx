import moment from "moment";
import React from "react";
import { NavLink } from "react-router-dom";
import noavt from "../assets/images/noavt.png";
import { UserValues } from "../pages/Profile";
import LikeTweet from "./LikeTweet";
import ReplyTweet from "./ReplyTweet";

export interface TweetProps {
  id: number;
  createdAt: Date;
  authorId: number;
  content: string;
  name: string;
  likes: [];
  files?: string;
  comments: [];
  userData: UserValues;
  avatar: string;
}

const TweetCard = (props: TweetProps) => {
  return (
    <div className="d-flex text-dark border-top tweet-card border-bottom border-grey p-3">
      <NavLink
        to={`/user/${props.authorId}`}
        style={{
          width: 50,
          height: 50,
          borderRadius: "50%",
          overflow: "hidden",
        }}
        className="mr-3"
      >
        <img
          src={props.avatar ? props.avatar : noavt}
          className="w-100 h-100"
          style={{ objectFit: "cover" }}
          alt="Avatar"
        />
      </NavLink>
      <div className="d-flex w-100 pr-4 pl-2 flex-column">
        <div className="d-flex w-100 justify-content-between align-items-center">
          <NavLink
          style={{textDecoration:'none'}}
            to={`/user/${props.authorId}`}
            className="d-flex text-dark align-items-end"
          >
            <p className="fs-1 font-weight-bold mr-2">{props.name}</p>
            <p>
              @{props.name}
              {props.authorId}2131 &nbsp;{" "}
            </p>
            <p style={{ fontSize: 10 }}>
              {"  "} - {moment(props.createdAt).fromNow()}
            </p>
          </NavLink>
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
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
        </div>
        <NavLink
          to={{
            pathname: `/tweet/${props.id}`,
          }}
          style={{ textDecoration: "none" }}
          className=""
        >
          <p
            id="content"
            className="text-dark"
            dangerouslySetInnerHTML={{ __html: props.content }}
          ></p>
        </NavLink>
        <div
          className={
            props.files != null && props.files.split(" , ").length > 1
              ? "container-fluid my-4 grid-image"
              : "container-fluid   my-4"
          }
        >
          {props.files != null &&
            props.files.split(" , ").length > 0 &&
            props.files.split(" , ").map((url) => (
              <div
                key={url}
                style={{ width: "100%", height: 300 }}
                className="  rounded overflow-hidden"
              >
                <img
                  src={url}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  alt="tweet file"
                />
              </div>
            ))}
        </div>
        <div className="d-flex  justify-content-between w-100 pr-3">
          <ReplyTweet
            userData={props.userData}
            comments={props.comments}
            id={props.id}
            likes={props.likes ? props.likes : []}
            createdAt={props.createdAt}
            content={props.content}
            authorId={props.authorId}
            name={props.name}
            avatar={props.avatar}
          />
          <div className="d-flex tweet-widget  text-muted btn align-items-center">
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
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
            <span className="ml-2">33.4K</span>
          </div>
          <LikeTweet
            userData={props.userData}
            likes={props.likes}
            tweet={props}
          />
          <div className="d-flex tweet-widget  text-muted btn align-items-center">
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
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            <span className="ml-2">33.4K</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TweetCard;
