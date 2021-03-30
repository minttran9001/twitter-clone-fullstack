import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { ME_QUERY } from "../pages/Profile";

const DELETE_FOLLOW_MUTATION = gql`
  mutation deleteFollow($id: Int!) {
    deleteFollow(id: $id) {
      id
    }
  }
`;

interface FollowProps {
  id: number;
}

const UnFollow = ({ id }: FollowProps) => {
  const [deleteFollow] = useMutation(DELETE_FOLLOW_MUTATION, {
    refetchQueries: [{ query: ME_QUERY }],
  });
  const onFollowUser = async () => {
    deleteFollow({
      variables: {
        id,
      },
    })
      .then(() => console.log("Deleted Follow"))
      .catch((err) => console.log(err));
  };

  return (
    <button
      onClick={onFollowUser}
      style={{ border: "1px solid #78A1D1", color: "#78A1D1" }}
      className="form-control mr-1 rounded"
    >
      <span>Unfollow</span>
    </button>
  );
};
export default UnFollow;
