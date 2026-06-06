import { useMutation } from "@apollo/client/react";
import { DELETE_ISSUE } from "~/lib/query/graphql";

export function useIssueDelete() {
  const [deleteIssue] = useMutation(DELETE_ISSUE);

  return {
    delete: (id: string) => deleteIssue({ variables: { issueId: id } }),
  }
}