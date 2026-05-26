import IssuesView from "../../features/issues/views/IssuesView";
import type { Route } from "./+types/project.issues";

export default function Page({
  params,
}: Route.ComponentProps) {
  return <IssuesView projectId={params.projectId} />;
}