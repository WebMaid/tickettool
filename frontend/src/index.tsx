import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import "./i18n";
import { onError } from "apollo-link-error";
import { HttpLink } from "apollo-link-http";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from "jwt-decode";
import React from "react";
import ReactDOM from "react-dom";
import { getAccessToken, setAccessToken } from "./accessToken";
import { App } from "./App";
import "./index.css";

const cache = new InMemoryCache();
const requestLink = new ApolloLink((operation, forward) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    operation.setContext({
      headers: {
        authorization: accessToken ? `bearer ${accessToken}` : "",
      },
    });
  }
  return forward(operation);
});
const tokenRefreshLink: any = new TokenRefreshLink({
  accessTokenField: "accessToken",
  isTokenValidOrUndefined: () => {
    const token = getAccessToken();
    if (token === "") return true;
    try {
      const { exp }: any = jwtDecode(token);
      if (Date.now() >= exp * 1000) {
        return false;
      } else {
        return true;
      }
    } catch {
      return false;
    }
  },
  fetchAccessToken: () => {
    return fetch("http://localhost:3001/refresh_token", {
      method: "POST",
      credentials: "include",
    });
  },
  handleFetch: (accessToken) => {
    setAccessToken(accessToken);
  },
  handleError: (err) => {
    if (getAccessToken() === "" || !getAccessToken()) return;
    console.warn("Your refresh token is invalid. Try to relogin");
    console.error(err);
  },
});

const client = new ApolloClient({
  link: ApolloLink.from([
    tokenRefreshLink,
    onError(({ graphQLErrors, networkError }) => {
      console.log(graphQLErrors);
      console.log(networkError);
    }),
    requestLink,
    new HttpLink({
      uri: "http://localhost:3001/graphql",
      credentials: "include",
    }),
  ]),
  cache,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
