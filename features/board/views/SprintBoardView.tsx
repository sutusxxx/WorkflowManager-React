import { Typography } from "@mui/material";
import { useSprintBoard } from "../hooks/useSprintBoard"
import KanbanBoard from "../components/KanbanBoard";

export default function SprintBoardView({ projectId, onIssueSelect }: {
  projectId: string,
  onIssueSelect: (issueKey: string) => void;
}) {
  const { sprint, moveIssue } = useSprintBoard(projectId);

  if (!sprint) return <Typography variant="body2">No active Sprint</Typography>

  return <KanbanBoard sprint={sprint} onMoveIssue={moveIssue} onIssueClick={(issue) => onIssueSelect(issue.key)} />
}