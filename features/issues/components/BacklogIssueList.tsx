import { Divider, Stack } from "@mui/material";
import type { Issue } from "../../../shared/types/issue";
import IssueListItem from "./IssueListItem";
import { useMutation } from "@apollo/client/react";
import { MOVE_TO_SPRINT } from "~/lib/query/graphql";

type BacklogIssueListProps = {
  issues: Issue[];
  sprintId: string | null;
}

export default function BacklogIssueList({ issues, sprintId }: BacklogIssueListProps) {
  const [moveToSprint] = useMutation(MOVE_TO_SPRINT);

  const handleMoveToSprint = (issue: Issue) => {
    moveToSprint({ variables: { sprintId, input: { issueId: issue.id } } })
  };

  return (
    <Stack spacing={1}>
      {issues.map(issue => (
        <>
          <IssueListItem
            item={issue}
            menuItems={sprintId
              ? [{ label: "Move to sprint", onClick: () => handleMoveToSprint(issue) }]
              : []}
          />
          <Divider />
        </>
      ))}
    </Stack>
  );
}