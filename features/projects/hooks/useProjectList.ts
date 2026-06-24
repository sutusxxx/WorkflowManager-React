import { useQuery } from "@apollo/client/react";
import { GET_PROJECTS } from "~/lib/query/graphql";
import type { ProjectListResponse } from "~/lib/types/project-list-response";
import type { Connection } from "../../../shared/interfaces/connection";
import type { Project } from "../../../shared/types/project";
import type { ErrorLike } from "@apollo/client";

type useProjectListResult = {
  data?: Connection<Project>;
  error?: ErrorLike;
  loading: boolean;
  loadMore: () => void;
}

export function useProjectList(): useProjectListResult {
  const { data, loading, error, fetchMore } = useQuery<ProjectListResponse>(
    GET_PROJECTS,
    { variables: { first: 1 } },
  );

  const loadMore = () => {
    if (!data?.projects.pageInfo.hasNextPage) return;

    fetchMore({
      variables: {
        first: 1,
        after: data.projects.pageInfo.endCursor,
      },
      updateQuery(previousResult, { fetchMoreResult }) {
        if (!fetchMoreResult) return previousResult;

        return {
          projects: {
            ...fetchMoreResult.projects,
            edges: [
              ...previousResult.projects.edges,
              ...fetchMoreResult.projects.edges,
            ],
          },
        };
      },
    });
  };

  return {
    data: data?.projects,
    loading,
    loadMore,
    error,
  };
}