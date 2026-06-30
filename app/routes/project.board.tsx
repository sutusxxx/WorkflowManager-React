import SprintBoardView from "../../features/board/views/SprintBoardView";
import type { Route } from "./+types/project.board";
import { useSelectedIssue } from "../../features/issues/hooks/useSelectedIssue";

export default function Page({
  params,
}: Route.ComponentProps) {
  const { dialog, selectIssue } = useSelectedIssue();
  return (
    <>
      <SprintBoardView projectId={params.projectId} onIssueSelect={selectIssue} />
      {dialog}
    </>
  );
}