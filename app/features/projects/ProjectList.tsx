import { Stack, Typography } from "@mui/material";
import type { Project } from "../../interfaces/project";
import LoadingIndicator from "~/components/misc/LoadingIndicator";
import Link from "~/components/navigation/Link";
import { useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";

type ProjectListResponse = {
    projects: Project[];
};

export default function ProjectList() {
    const { data, loading, error } = useQuery<ProjectListResponse>(gql`
        query GetProjects {
            projects {
                id
                key
                name
            }
        }
    `);

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
