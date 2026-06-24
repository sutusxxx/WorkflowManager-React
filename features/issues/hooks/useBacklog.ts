import type { ErrorLike } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { GET_BACKLOG } from "~/lib/query/graphql";
import type { BacklogResponse } from "~/lib/types/backlog.response";
import type { Connection } from "../../../shared/interfaces/connection";
import type { Issue } from "../../../shared/types/issue";

type useBacklogResult = {
  data?: Connection<Issue>;
  error?: ErrorLike;
  loading: boolean;
  loadMore: () => void;
}

export function useBacklog(projectId: string) {
  const { data, loading, error, fetchMore } = useQuery<BacklogResponse>(GET_BACKLOG, { variables: { projectId, first: 5 } });

  const loadMore = () => {
    if (!data?.backlog.pageInfo.hasNextPage) return;

    fetchMore({
      variables: {
        first: 5,
        after: data.backlog.pageInfo.endCursor,
      },
      updateQuery(previousResult, { fetchMoreResult }) {
        if (!fetchMoreResult) return previousResult;

        return {
          backlog: {
            ...fetchMoreResult.backlog,
            edges: [
              ...previousResult.backlog.edges,
              ...fetchMoreResult.backlog.edges,
            ],
          },
        };
      },
    });
  };

  return {
    data: data?.backlog,
    error,
    loadMore,
    loading,
  };
}