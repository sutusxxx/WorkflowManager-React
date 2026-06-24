import { useQuery } from "@apollo/client/react";
import { GET_SPRINT_BOARD } from "~/lib/query/graphql";
import type { SprintBoardResponse } from "~/lib/types/sprint-board.response";

export function useSprintBoard(projectId: string) {
  return useQuery<SprintBoardResponse>(GET_SPRINT_BOARD, { variables: { projectId } });
}