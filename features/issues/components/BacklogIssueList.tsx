import { Divider, Stack } from "@mui/material";
import type { Issue } from "../../../shared/types/issue";
import IssueListItem from "./IssueListItem";
import { useMutation } from "@apollo/client/react";
import { MOVE_TO_SPRINT } from "~/lib/query/graphql";
import React from "react";

type BacklogIssueListProps = {
  issues: Issue[];
  onMoveIssue: (issue: Issue) => void;
}

export default function BacklogIssueList({ issues, onMoveIssue }: BacklogIssueListProps) {
  return (
    <Stack spacing={1}>
      {issues.map(issue => (
        <React.Fragment key={issue.id}>
          <IssueListItem
            item={issue}
            menuItems={[{ label: "Move to sprint", onClick: () => onMoveIssue(issue) }]}
          />
          <Divider />
        </React.Fragment>
      ))
      }
    </Stack >
  );
}