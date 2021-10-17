import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css"
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  ApolloLink
} from '@apollo/client';
import { getAccessToken, setAccessToken } from './accessToken';
import { App } from './App';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import jwtDecode from 'jwt-decode';

const cache = new InMemoryCache();
const requestLink = new ApolloLink((operation, forward) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    operation.setContext({
      headers: {
        authorization: accessToken ? `bearer ${accessToken}` : ""
      }
    });
  }
  return forward(operation);
});
const tokenRefreshLink: any = (new TokenRefreshLink({
  accessTokenField: 'accessToken',
  isTokenValidOrUndefined: () => {
    const token = getAccessToken();
    if (token === "")
      return true;
    try {
      const {exp}: any = jwtDecode(token);
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
    return fetch('http://localhost:3001/refresh_token', {
      method: 'POST',
      credentials: 'include'
  })
  },
  handleFetch: accessToken => {
    setAccessToken(accessToken);
  },
  handleError: err => {
    if (getAccessToken() === "" || !getAccessToken())
      return;
    console.warn('Your refresh token is invalid. Try to relogin');
    console.error(err);
  }
}));

const client = new ApolloClient({
  link: ApolloLink.from([
    tokenRefreshLink,
    onError(({ graphQLErrors, networkError }) => {
      console.log(graphQLErrors);
      console.log(networkError);
    }),
    requestLink,
    new HttpLink({
      uri: 'http://localhost:3001/graphql',
      credentials: 'include'
    })
  ]),
  cache
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
