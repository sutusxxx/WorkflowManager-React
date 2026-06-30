import SprintBoardView from "../../features/board/views/SprintBoardView";
import type { Route } from "./+types/project.board";
import { useSelectedIssue } from "../../features/issues/hooks/useSelectedIssue";
import { Suspense } from "react";
import { Box } from "@mui/material";
import LoadingIndicator from "../../components/misc/LoadingIndicator";

export default function Page({
  params,
}: Route.ComponentProps) {
  const { dialog, selectIssue } = useSelectedIssue();
  return (
    <Suspense fallback={
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
        <LoadingIndicator />
      </Box>
    }>
      <SprintBoardView projectId={params.projectId} onIssueSelect={selectIssue} />
      {dialog}
    </Suspense>
  );
}