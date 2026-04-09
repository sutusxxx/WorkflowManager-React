import { Stack, Typography } from "@mui/material";
import type { Project } from "../../interfaces/project";
import { useQuery } from "@tanstack/react-query";
import { clientInstance } from "~/lib/api/client";
import { QUERY_KEY } from "~/constants/queries.constant";
import LoadingIndicator from "~/components/misc/LoadingIndicator";
import Link from "~/components/navigation/Link";

type ProjectListResponse = {
    projects: Project[];
};

export default function ProjectList() {
    const { data, isLoading, isError } = useQuery<ProjectListResponse>({
        queryKey: [QUERY_KEY.PROJECTS],
        queryFn: async () => {
            const response = await clientInstance.get("/projects");

            return { projects: response.data ?? [] };
        },
    });

    if (isLoading) return <LoadingIndicator />;
    if (isError) return <Typography variant="body2" color="error">Cannot fetch projects</Typography>
    if (!data?.projects.length) return <Typography variant="body2">Not Found</Typography>

    return (
        <Stack
            spacing={1}
            sx={{ marginLeft: 2 }}
        >
            {data.projects.map(project =>
                <Link
                    to={`/projects/${project.key}/board`}
                    key={project.key}
                    sx={{
                        fontWeight: "bold",
                        textDecoration: "none",
                        color: "initial",
                    }}
                >
                    {project.key}
                </Link>
            )}
        </Stack>
    );
}
