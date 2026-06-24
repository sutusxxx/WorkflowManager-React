import { useQuery } from "@apollo/client/react";
import { GET_SPRINTS } from "~/lib/query/graphql";
import type { SprintListResponse } from "~/lib/types/sprint-list.response";

export default function useSprintList(projectId: string) {
  return useQuery<SprintListResponse>(GET_SPRINTS, { variables: { projectId, page: 0, pageSize: 1 } });
}