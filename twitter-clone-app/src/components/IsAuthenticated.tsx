import { gql, useQuery } from "@apollo/client";
import { Redirect } from "react-router-dom";
import { Children } from "./Layout";
import Loading from "./Loading";
export const IS_LOGGED_IN = gql`
  {
    me {
      id
    }
  }
`;

const IsAuthenticated = ({ children }: Children) => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN);

  if (loading) return <Loading/>;
  if (error) return <p>{error.message}</p>;
  if (!data.me) {
    return <Redirect to={{ pathname: "/landing" }} />;
  }

  return <>{children}</>;
};
export default IsAuthenticated;
