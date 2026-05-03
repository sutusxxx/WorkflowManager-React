import { Stack, Typography } from "@mui/material";
import { useQuery } from "@apollo/client/react";
import { GET_PROJECTS } from "~/lib/query/graphql";
import LoadingIndicator from "../../../components/misc/LoadingIndicator";
import Link from "../../../components/navigation/Link";
import type { ProjectListResponse } from "../../../app/lib/types/project-list-response";

export default function ProjectListView() {
    const { data, loading, error } = useQuery<ProjectListResponse>(GET_PROJECTS);

    if (loading) return <LoadingIndicator />;
    if (error) return <Typography variant="body2" color="error">Cannot fetch projects</Typography>
    if (!data?.projects.length) return <Typography variant="body2">Not Found</Typography>

    return (
        <Stack
            spacing={1}
            sx={{ marginLeft: 2 }}
        >
            {data.projects.map(project =>
                <Link
                    to={`/projects/${project.id}/board`}
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
