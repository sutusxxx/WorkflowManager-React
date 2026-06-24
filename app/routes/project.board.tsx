import SprintBoardView from "../../features/issues/views/SprintBoardView";
import type { Route } from "./+types/project.board";

export default function Page({
  params,
}: Route.ComponentProps) {
  return (
    <SprintBoardView projectId={params.projectId} />
  )
}