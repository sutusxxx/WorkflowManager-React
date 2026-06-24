import { Typography } from "@mui/material";
import LoadingIndicator from "../../../components/misc/LoadingIndicator";
import { useSprintBoard } from "../hooks/useSprintBoard"

export default function SprintBoardView({ projectId }: { projectId: string }) {
  const { data, error, loading } = useSprintBoard(projectId);

  if (loading) return <LoadingIndicator />

  if (error || !data) return <Typography>No active Sprint</Typography>
  return <>
    {data.sprintBoard}
  </>
}