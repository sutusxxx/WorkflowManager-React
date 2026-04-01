import { Box, Typography } from "@mui/material";
import type { Project } from "../../interfaces/project";
import { useQuery } from "@tanstack/react-query";
import { clientInstance } from "~/lib/api/client";

export default function ProjectList() {
    const { data: projects } = useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            const response = await clientInstance.get('/projects');
            return response.data as Project[];
        },
    });

    return (
        <Box>
            {projects?.map(project => <Typography key={project.key}>{project.name} - {project.key}: {project.description}</Typography>)}
        </Box>
    );
}
