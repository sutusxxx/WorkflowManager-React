import { Box, Typography } from "@mui/material";
import type { Project } from "../../interfaces/project";

export default function ProjectList({ projects }: { projects: Project[] }) {
    return (
        <Box>
            {projects.map(project => <Typography key={project.key}>{project.name} - {project.key}: {project.description}</Typography>)}
        </Box>
    )
}
