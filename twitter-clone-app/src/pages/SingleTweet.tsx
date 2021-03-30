import { gql, useQuery } from "@apollo/client";
import moment from "moment";
import React from "react";
import { NavLink, useParams } from "react-router-dom";
import LikeTweet from "../components/LikeTweet";
import ReplyTweet from "../components/ReplyTweet";
import noavt from "../assets/images/noavt.png";
import Header from "../components/Header";
import { ME_QUERY } from "./Profile";
import CommentCard from "../components/CommentCard";
interface TweetParams {
  id: string;
}

export const SINGLE_TWEET_QUERY = gql`
  query tweet($id: Int) {
    tweet(id: $id) {
      id
      createdAt
      content
      files
      likes {
        id
      }
      comments {
        id
        content
        createdAt
        commentId
        User {
          id
          name
          Profile {
            id
            avatar
          }
        }
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
  }
`;
export interface ReplyValues {
  id: number;
  content: string;
  commentId: number;
  createdAt: Date;
  User: {
    id: number;
    name: string;
    Profile: {
      avatar: string;
      id: number;
    };
  };
}
export interface CommentValues {
  id: number;
  content: string;
  commentId: number;
  replies: [];
  createdAt: Date;
  User: {
    id: number;
    name: string;
    Profile: {
      avatar: string;
      id: number;
    };
  };
}

const SingleTweet = () => {
  const { id } = useParams<TweetParams>();
  const {
    loading: meLoading,
    error: meError,
    data: meData,
  } = useQuery(ME_QUERY);
  const { loading, error, data } = useQuery(
    SINGLE_TWEET_QUERY,
    {
      variables: { id: parseInt(id) },
    }
  );
  if (loading) return <>Loading...</>;
  if (meLoading) return <>Me loading...</>;
  if (error) return <>{error.message}</>;
  if (meError) return <>{meError.message}</>;
  return (
    <>
      <Header>Tweet</Header>
      <div className="d-flex text-dark border-top tweet-card border-bottom border-grey p-3">
        <NavLink
          to={`/user/${data.tweet.author.id}`}
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
              data.tweet.author.Profile.avatar
                ? data.tweet.author.Profile.avatar
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
              to={`/user/${data.tweet.author.id}`}
              className="d-flex text-dark  align-items-end"
            >
              <p className="fs-1 font-weight-bold mr-2">
                {" "}
                {data.tweet.author.name}
              </p>
              <p>
                @{data.tweet.author.name}
                {data.tweet.author.id}2131 &nbsp;{" "}
              </p>
              <p style={{ fontSize: 10 }}>
                {"  "} - {moment(data.tweet.createdAt).fromNow()}
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
              dangerouslySetInnerHTML={{ __html: data.tweet.content }}
            ></p>
          </div>
          <div
            className={
              data.tweet.files != null &&
              data.tweet.files.split(" , ").length > 1
                ? "container-fluid my-4 grid-image"
                : "container-fluid   my-4"
            }
          >
            {data.tweet.files != null &&
              data.tweet.files.split(" , ").length > 0 &&
              data.tweet.files.split(" , ").map((url: any) => (
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
             
              userData={meData.me}
              comments={data.tweet.comments}
              id={data.tweet.id}
              likes={data.tweet.likes ? data.tweet.likes : []}
              createdAt={data.tweet.createdAt}
              content={data.tweet.content}
              authorId={data.tweet.author.id}
              name={data.tweet.author.name}
              avatar={data.tweet.author.Profile.avatar}
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
             
              userData={meData.me}
              likes={data.tweet.likes}
              tweet={data.tweet}
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
      {data.tweet.comments
        .filter((item: CommentValues) => item.commentId === null)
        .map((comment: CommentValues) => (
          <CommentCard
            key={String(comment.createdAt)}
            userData={meData.me}
            reply={comment}
            tweetId={data.tweet.id}
            comment={comment}
          />
        ))}
    </>
  );
};
export default SingleTweet;
