import type { Issue } from "../../../shared/types/issue";
import SortableList from "../../../components/lists/SortableList";
import { useMutation } from "@apollo/client/react";
import { MOVE_TO_SPRINT } from "~/lib/query/graphql";
import IssueListItem from "./IssueListItem";
import { Box, Typography } from "@mui/material";

type SprintIssueListProps = {
  sprintId: string;
  issues: Issue[];
  onIssueSelect?: (issue: Issue) => void;
}

export default function SprintIssueList({ sprintId, issues, onIssueSelect }: SprintIssueListProps) {
  const [moveIssue] = useMutation(MOVE_TO_SPRINT);

  const handleSort = (prevIndex: number, newIndex: number) => {
    const issueToMove = issues[prevIndex];
    const issueOnPosition = issues[newIndex];

    moveIssue({
      variables: {
        sprintId,
        input: {
          issueId: issueToMove.id, nextIssueId: prevIndex < newIndex ? issueOnPosition.nextIssueId : issueOnPosition.id,
        },
      }
    });
  }

  if (!issues.length) return (
    <Box sx={{
      display: "flex",
      justifyContent: "center",
    }}>
      <Typography variant="body2">No issues</Typography>
    </Box>
  )

  return (
    <SortableList
      items={issues}
      onSort={handleSort}
      getId={(item) => item.key}
      renderComponent={(item) => (
        <IssueListItem item={item} onSelect={onIssueSelect} />
      )}
    />
  );
}