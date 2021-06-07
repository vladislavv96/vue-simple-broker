import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { Observable } from "apollo-link";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";
import { logout, getRefreshToken, login } from "@/services/auth";

const link = new HttpLink({
  uri: process.env.VUE_APP_GRAPHQL_ENDPOINT_HTTP,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("accessToken");

  return {
    headers: {
      ...headers,
      authotization: `Bearer ${token}`,
    },
  };
});

const refreshLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (err.extensions.code === "UNAUTHENTICATED") {
        return promiseToObservable(refreshToken(operation)).flatMap(() =>
          forward(operation)
        );
      }
    }
  }
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link: refreshLink.concat(authLink.concat(link)),
  cache,
  connectToDevTools: true,
});

export default apolloClient;

const promiseToObservable = (promise) =>
  new Observable((subscriber) => {
    promise.then(
      (value) => {
        if (subscriber.closed) return;
        subscriber.next(value);
        subscriber.complete();
      },
      (err) => subscriber.error(err)
    );
    return subscriber;
  });
const refreshToken = (operation) => {
  return fetch(process.env.VUE_APP_API_REFRESH_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refreshToken: getRefreshToken(),
    }),
  })
    .then((o) => o.json())
    .then((refreshJson) => {
      if (refreshJson.status >= 400) throw new Error(refreshJson.reason);
      login({
        accessToken: refreshJson.accessToken,
        refreshToken: refreshJson.refreshToken,
      });
      operation.setContext({
        headers: {
          ...operation.getContext().headers,
          authotization: refreshJson.accessToken,
        },
      });
    })
    .catch(() => logout());
};
