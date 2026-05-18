import { ApolloClient, ApolloLink, CombinedGraphQLErrors, CombinedProtocolErrors, HttpLink, InMemoryCache, ServerError } from "@apollo/client";
import { ErrorLink } from "@apollo/client/link/error";
import { clientInstance } from "../api/client";
import { HttpStatusCode } from "axios";

const link = new HttpLink({
  uri: "/api/graphql",
  credentials: "include",
});

let isRefreshing = false;
let isRedirecting = false;

const errorLink = new ErrorLink(({ error, operation, forward }) => {
  if (CombinedGraphQLErrors.is(error)) {
    error.errors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  } else if (CombinedProtocolErrors.is(error)) {
    error.errors.forEach(({ message, extensions }) =>
      console.log(
        `[Protocol error]: Message: ${message}, Extensions: ${JSON.stringify(
          extensions
        )}`
      )
    );
  } else if (ServerError.is(error)) {
    if (error.statusCode === 401 && !isRedirecting) {
      if (!isRefreshing) {
        isRefreshing = true;

        clientInstance.post("/auth/refresh").then(res => {
          isRefreshing = false;
          if (res.status === HttpStatusCode.Ok) {
            forward(operation);
          } else {
            isRedirecting = true;
            window.location.href = `/login?redirectTo=${encodeURIComponent(window.location.pathname)}`;
          }
        })
          .catch(() => {
            isRefreshing = false;
            isRedirecting = true;
            window.location.href = `/login?redirectTo=${encodeURIComponent(window.location.pathname)}`;
          })
      }
    }
  }
});

export function makeQueryClient() {
  return new ApolloClient({
    link: ApolloLink.from([errorLink, link]),
    cache: new InMemoryCache(),
  });
}