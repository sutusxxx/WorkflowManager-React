import Stack from "@mui/material/Stack";
import Link from "../../../components/navigation/Link";
import type { Project } from "../../../shared/types/project";

type ProjectListProps = {
  projects: Project[];
  onClick: (projectId: string) => void;
}

export default function ProjectList({ projects, onClick }: ProjectListProps) {
  return (
    <Stack
      spacing={1}
      sx={{ marginLeft: 2 }}
    >
      {projects.map(project =>
        <Link
          to={`/projects/${project.id}/board`}
          onClick={() => onClick(project.id)}
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
  )
}