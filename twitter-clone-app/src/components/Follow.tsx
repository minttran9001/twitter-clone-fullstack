import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { ME_QUERY } from "../pages/Profile";

const FOLLOW_MUTATION = gql`
  mutation follow($followId: Int!, $avatar: String!, $name: String!) {
    follow(name: $name, followId: $followId, avatar: $avatar) {
      id
    }
  }
`;

interface FollowProps {
  id: number;
  name: string;
  avatar: string;
}

const Follow = ({ id, name, avatar }: FollowProps) => {
  const [follow] = useMutation(FOLLOW_MUTATION, {
    refetchQueries: [{ query: ME_QUERY }],
  });
  const onFollowUser = async () => {
    console.log({
      followId: id,
      name,
      avatar,
    });

    follow({
      variables: {
        followId: id,
        name,
        avatar,
      },
    })
      .then(() => console.log("Followed"))
      .catch((err) => console.log(err));
  };

  return (
    <button
      onClick={onFollowUser}
      style={{ border: "1px solid #78A1D1", color: "#78A1D1" }}
      className="form-control mr-1 rounded"
    >
      <span>Follow</span>
    </button>
  );
};
export default Follow;
