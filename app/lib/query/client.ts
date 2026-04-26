import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const link = new HttpLink({
  uri: "/api/graphql",
  credentials: "include",
});

export function makeQueryClient() {
  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });
}