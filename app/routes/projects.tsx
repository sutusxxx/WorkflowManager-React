import ProjectList from "~/components/projects/ProjectList";
import type { Route } from "./+types/projects";
import type { Project } from "~/components/projects/project";

export async function loader() {
    const response = await fetch("http://localhost:8080/api/v1/projects")

    if (!response.ok) {
        throw new Response("Failed to fetch projects", { status: response.status });
    }

    const data = await response.json();

    return { projects: data as Project[] };
}

export default function Projects({
    loaderData,
}: Route.ComponentProps) {
    return <ProjectList projects={loaderData.projects} />
}