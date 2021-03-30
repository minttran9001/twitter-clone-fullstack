import { useQuery, useSubscription } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";

const PUSH_NOTIFICATIONS = gql`
  query me {
    me {
      id
      name
      email
      Following {
        id
        followId
        avatar
        name
        UserFollowed {
          id
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
        }
      }
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

const Notifications = () => {
  const { error, data, loading } = useQuery(PUSH_NOTIFICATIONS);
  console.log(data);
  
  return <div>Notifications</div>;
};
export default Notifications;
