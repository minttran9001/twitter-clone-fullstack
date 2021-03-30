import React from "react";
import noavt from "../assets/images/noavt.png";
import moment from "moment";
import CreateReply from "./CreateReply";
import { CommentValues, ReplyValues } from "../pages/SingleTweet";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import LikeTweet from "./LikeTweet";
import Loading from "./Loading";
import { UserValues } from "../pages/Profile";
import { NavLink } from "react-router-dom";

interface CommentProps {
  userData: UserValues;
  tweetId: number;
  reply: ReplyValues;
  comment: CommentValues;
}

export const COMMENT_QUERY = gql`
  query COMMENT_QUERY($commentId: Int) {
    comments(commentId: $commentId) {
      id
      content
      createdAt
      User {
        id
        name
        Profile {
          avatar
        }
      }
    }
  }
`;

const CommentCard = ({
  comment: props,

  userData,
  tweetId,
}: CommentProps) => {
  const { loading, error, data, refetch } = useQuery(COMMENT_QUERY, {
    variables: { commentId: props.id },
  });
  const setState = () => {
    refetch();
  };
  const [viewAll, setViewAll] = React.useState(2);
  if (loading) return <Loading />;
  if (error) return <>{error.message}</>;
  return (
    <div className="d-flex border-top text-dark tweet-card border-bottom border-grey p-3">
      <NavLink
        to={`/user/${props.User.id}`}
        style={{
          width: 50,
          height: 50,
          borderRadius: "50%",
          overflow: "hidden",
        }}
        className="mr-3"
      >
        <img
          src={props.User.Profile.avatar ? props.User.Profile.avatar : noavt}
          className="w-100 h-100"
          style={{ objectFit: "cover" }}
          alt="Avatar"
        />
      </NavLink>
      <div className="d-flex w-100 pr-4 pl-2 flex-column">
        <div className="d-flex w-100 justify-content-between align-items-center">
          <NavLink
            style={{ textDecoration: "none" }}
            to={`/user/${props.User.id}`}
            className="d-flex  text-dark align-items-end"
          >
            <p className="fs-1 font-weight-bold mr-2">{props.User.name}</p>
            <p>
              @{props.User.name}
              {props.User.id}2131 &nbsp;{" "}
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
        <div className="">
          <p
            id="content"
            className="text-dark"
            dangerouslySetInnerHTML={{ __html: props.content }}
          ></p>
        </div>
        <div className="d-flex   w-100 pr-3">
          <CreateReply
            refetch={setState}
            reply={data.comments}
            userData={userData}
            id={tweetId}
            createdAt={props.createdAt}
            content={props.content}
            authorId={props.User.id}
            name={props.User.name}
            avatar={props.User.Profile.avatar}
            commentId={props.id}
          />

          <LikeTweet userData={userData} likes={[]} tweet={props} />
        </div>
        <p>
          {data.comments.slice(0, viewAll).map((reply: ReplyValues) => (
            <div className="d-flex text-dark tweet-card p-3">
              <NavLink
                to={`/user/${reply.User.id}`}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  overflow: "hidden",
                }}
                className="mr-3"
              >
                <img
                  src={
                    reply.User.Profile.avatar
                      ? reply.User.Profile.avatar
                      : noavt
                  }
                  className="w-100 h-100"
                  style={{ objectFit: "cover" }}
                  alt="Avatar"
                />
              </NavLink>
              <div className="d-flex w-100 pr-4 pl-2 flex-column">
                <div className="d-flex w-100 justify-content-between align-items-center">
                  <NavLink
                    style={{ textDecoration: "none" }}
                    to={`/user/${reply.User.id}`}
                    className="d-flex  text-dark align-items-end"
                  >
                    <p className="fs-1 font-weight-bold mr-2">
                      {reply.User.name}
                    </p>
                    <p>
                      @{reply.User.name}
                      {reply.User.id}12231 &nbsp;{" "}
                    </p>
                    <p style={{ fontSize: 10 }}>
                      {"  "} - {moment(reply.createdAt).fromNow()}
                    </p>
                  </NavLink>
                </div>
                <div className="">
                  <p
                    id="content"
                    className="text-dark"
                    dangerouslySetInnerHTML={{ __html: reply.content }}
                  ></p>
                </div>
                <div className="d-flex  justify-content-between w-100 pr-3"></div>
              </div>
            </div>
          ))}
          {data.comments.length > 2 && (
            <span
              onClick={() => {
                viewAll === 2
                  ? setViewAll(data.comments.length)
                  : setViewAll(2);
              }}
              className="btn text-dark"
            >
              {viewAll === 2
                ? `View all ${data.comments.length} comments`
                : "Hide comments"}
            </span>
          )}
        </p>
      </div>
    </div>
  );
};
export default CommentCard;
