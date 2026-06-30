import { Box, Stack, Typography, Chip } from "@mui/material";
import type { Issue } from "../../../shared/types/issue";
import type { Sprint } from "../../../shared/types/sprint"
import { useKanbanColumns } from "../hooks/useKanbanColumns";
import { KanbanColumn } from "./KanbanColumn";

type KanbanBoardProps = {
  sprint: Sprint;
  onIssueClick?: (issue: Issue) => void;
  onMoveIssue?: (issueId: string, newStatusId: string) => void;
}

export default function KanbanBoard({ sprint, onMoveIssue, onIssueClick }: KanbanBoardProps) {
  const columns = useKanbanColumns(sprint);

  const handleDrop = (e: React.DragEvent<Element>, statusId: string) => {
    const issueId = e.dataTransfer?.getData("issueId");
    if (issueId) onMoveIssue?.(issueId, statusId);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Stack spacing={0.5} sx={{ mb: 3 }}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Typography variant="h6">{sprint.name}</Typography>
          <Chip
            size="small"
            color="primary"
            label={sprint.project.key}
            variant="outlined"
            sx={{ fontWeight: 500 }}
          />
        </Stack>
        {sprint.goal && (
          <Typography variant="body2" color="text.secondary">
            {sprint.goal}
          </Typography>
        )}
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        sx={{ overflowX: "auto", pb: 1 }}
      >
        {columns.map(({ status, issues }) => (
          <KanbanColumn
            status={status}
            issues={issues}
            onIssueClick={onIssueClick}
            onDrop={handleDrop}
          />
        ))}
      </Stack>
    </Box>
  );
}