import { Box, Paper, Typography, Stack, Chip } from "@mui/material";
import type { Status } from "../../../shared/types/status";
import type { Issue } from "../../../shared/types/issue";
import { useState } from "react";
import { IssueCard } from "./IssueCard";

const CATEGORY_BG: Record<Status["category"], string> = {
  TODO: "#F4F5F7",
  IN_PROGRESS: "#DEEBFF",
  DONE: "#E3FCEF",
};

type KanbanColumnProps = {
  status: Status;
  issues: Issue[];
  onIssueClick?: (issue: Issue) => void;
  onDrop?: (e: React.DragEvent, statusId: string) => void;
}

export function KanbanColumn({ status, issues, onIssueClick, onDrop }: KanbanColumnProps) {
  const [draggedIssue, setDraggedIssue] = useState<Issue | null>(null);

  return (
    <Box
      sx={{ minWidth: 250, flex: "1 1 280px" }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        onDrop?.(e, status.id);
      }}
    >
      <Paper
        variant="outlined"
        sx={{
          bgcolor: CATEGORY_BG[status.category],
          borderTop: `4px solid ${status.color}`,
          p: 1.5,
          minHeight: 400,
          borderRadius: "15px",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ mb: 1.5, px: 0.5 }}
        >
          <Typography
            variant="overline"
            sx={{ fontWeight: 600, letterSpacing: 0.5, color: "text.secondary" }}
          >
            {status.name}
          </Typography>
          <Chip
            size="small"
            label={issues.length}
            sx={{ height: 18, "& .MuiChip-label": { px: 0.75, fontSize: 11 } }}
          />
        </Stack>

        <Box>
          {issues.map((issue) => (
            <IssueCard
              key={issue.id}
              issue={issue}
              onClick={onIssueClick}
              onDragStart={(e, issue) => {
                e.dataTransfer.setData("issueId", issue.id);
                setDraggedIssue(issue);
              }}
            />
          ))}

          {issues.length === 0 && (
            <Box
              sx={{
                py: 4,
                textAlign: "center",
                color: "text.disabled",
                fontSize: 13,
              }}
            >
              No issues
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
}