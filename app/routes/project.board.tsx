import type { Route } from "./+types/project.board";

export default function Page({
  params,
}: Route.ComponentProps) {
    return <>Project {params.projectKey} Board works!</>;
}