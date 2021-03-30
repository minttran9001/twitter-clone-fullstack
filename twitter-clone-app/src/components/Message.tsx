import React from "react";

interface Props {
  message: string;
}
export const Message = ({ message }: Props) => {
  return <p className="text-danger">{message}</p>;
};
