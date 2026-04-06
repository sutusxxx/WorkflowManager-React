import IssueList from "~/features/issues/IssueList";
import type { Route } from "./+types/project.issues";

export default function Page({
  params,
}: Route.ComponentProps) {
    return <IssueList projectKey={params.projectKey} />;
}