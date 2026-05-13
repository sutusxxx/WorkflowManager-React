import { ApolloClient, ApolloLink, CombinedGraphQLErrors, CombinedProtocolErrors, HttpLink, InMemoryCache, ServerError } from "@apollo/client";
import { ErrorLink } from "@apollo/client/link/error";

const link = new HttpLink({
  uri: "/api/graphql",
  credentials: "include",
});

const errorLink = new ErrorLink(({ error, operation }) => {
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
    if (error.statusCode === 401) {
      window.location.href = "/login";
    }
  }
});

export function makeQueryClient() {
  return new ApolloClient({
    link: ApolloLink.from([errorLink, link]),
    cache: new InMemoryCache(),
  });
}