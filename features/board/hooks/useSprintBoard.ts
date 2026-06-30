import { useMutation, useSuspenseQuery } from "@apollo/client/react";
import { GET_SPRINT_BOARD, STATUS_TRANSITION } from "~/lib/query/graphql";
import type { SprintBoardResponse } from "~/lib/types/sprint-board.response";

export function useSprintBoard(projectId: string) {
  const { data } = useSuspenseQuery<SprintBoardResponse>(GET_SPRINT_BOARD, { variables: { projectId } });

  const [changeStatus] = useMutation(STATUS_TRANSITION, {
    refetchQueries: [{ query: GET_SPRINT_BOARD, variables: { projectId } }],
  });

  const moveIssue = (issueId: string, newStatusId: string) => {
    changeStatus({ variables: { issueId, input: { newStatusId } } });
  }

  return {
    sprint: data.sprintBoard,
    moveIssue,
  }
}