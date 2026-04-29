import IssueListView from "../../features/issues/views/IssueListView";
import type { Route } from "./+types/project.issues";

export default function Page({
  params,
}: Route.ComponentProps) {
    return <IssueListView projectId={params.projectId} />;
}