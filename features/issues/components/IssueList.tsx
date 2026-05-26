import { Stack, Tooltip, Typography } from "@mui/material";
import type { Issue } from "../../../shared/types/issue";
import IssueTypeIcon from "./IssueTypeIcon";
import PriorityIcon from "./PriorityIcon";
import Link from "../../../components/navigation/Link";
import { QUERY_PARAM } from "../../../shared/constants/queries.constant";
import { StatusCategory } from "../../../shared/types/status";
import SortableList from "../../../components/lists/SortableList";
import { useMutation } from "@apollo/client/react";
import { MOVE_ISSUE } from "~/lib/query/graphql";

type IssueListItemProps = {
  item: Issue;
}

type IssueListProps = {
  sprintId: string;
  issues: Issue[];
}

function IssueListItem({ item }: IssueListItemProps) {
  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: "space-between",
      }}
    >
      <Stack direction="row" alignItems="center">
        <IssueTypeIcon issueType={item.type} />
        <PriorityIcon priority={item.priority} />
        <Link
          to={{ search: `?${QUERY_PARAM.SELECTED_ISSUE}=${item.key}` }}
          sx={item.status.category === StatusCategory.DONE ? { textDecoration: "line-through" } : undefined}
        >
          {item.key}
        </Link>
        <Tooltip title={item.status.name} placement="top" arrow>
          <Typography paddingLeft={0.5} variant="body2">{item.title}</Typography>
        </Tooltip>
      </Stack>
    </Stack>
  );
}

export default function IssuesList({ sprintId, issues }: IssueListProps) {
  const [moveIssue] = useMutation(MOVE_ISSUE);

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
    })
  }

  return (
    <SortableList
      items={issues}
      onSort={handleSort}
      getId={(item) => item.key}
      renderComponent={(item) => (
        <IssueListItem item={item} />
      )}
    />
  );
}