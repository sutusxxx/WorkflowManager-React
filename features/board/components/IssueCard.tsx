import { Card, CardContent, Stack, Typography, Chip, Box } from "@mui/material";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import type { Issue } from "../../../shared/types/issue";
import IssueTypeIcon from "../../issues/components/IssueTypeIcon";

type IssueCardProps = {
  issue: Issue;
  onClick?: (issue: Issue) => void;
  onDragStart?: (e: React.DragEvent, issue: Issue) => void;
}

export function IssueCard({ issue, onClick, onDragStart }: IssueCardProps) {
  return (
    <Card
      variant="outlined"
      draggable
      onDragStart={(e) => onDragStart?.(e, issue)}
      onClick={() => onClick?.(issue)}
      sx={{
        cursor: "grab",
        mb: 1,
        "&:hover": { borderColor: "primary.main", boxShadow: 1 },
        transition: "all 0.15s",
      }}
    >
      <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
        <Stack spacing={0.75}>
          <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: 1.3 }}>
            {issue.title}
          </Typography>

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <IssueTypeIcon issueType={issue.type} />
              <Typography variant="caption" color="text.secondary">
                {issue.key}
              </Typography>
            </Stack>

            {issue.children.length > 0 && (
              <Chip
                size="small"
                icon={<AccountTreeIcon sx={{ fontSize: 12 }} />}
                label={issue.children.length}
                sx={{ height: 20, "& .MuiChip-label": { px: 0.75, fontSize: 11 } }}
                variant="outlined"
              />
            )}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}