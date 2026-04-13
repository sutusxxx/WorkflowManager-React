import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const API_BASE_URL = import.meta.env.API_BASE_URL || "http://localhost:8080";

const link = new HttpLink({
  uri: `/api/graphql`,
  credentials: "include",
});

export function makeQueryClient() {
  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });
}