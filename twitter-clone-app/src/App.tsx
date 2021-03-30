import React from "react";
import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import { Users } from "./components/Users";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Landing } from "./components/Landing";
import { setContext } from "apollo-link-context";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import IsAuthenticated from "./components/IsAuthenticated";
import Profile from "./pages/Profile";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import SingleTweet from "./pages/SingleTweet";
import SingleUser from "./pages/SingleUser";
import Notifications from "./pages/Notifications";
const httpLink = new HttpLink({ uri: "http://localhost:4000" });
const authLink = setContext(async (req, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    ...headers,
    headers: {
      Authorization: token ? `Bearer ${token}` : null,
    },
  };
});
const link = authLink.concat(httpLink as any);
const client = new ApolloClient({
  link: link as any,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/landing" component={Landing} />
          <IsAuthenticated>
            <Layout>
              <Route path="/users" component={Users} />
              <Route path="/profile" component={Profile} />
              <Route path="/home" component={Home} />
              <Route path="/tweet/:id" component={SingleTweet} />
              <Route path="/user/:id" component={SingleUser} />
              <Route path="/notifications" component={Notifications} />

            </Layout>
          </IsAuthenticated>
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
