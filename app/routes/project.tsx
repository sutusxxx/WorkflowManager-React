import { Box, Stack, Tab, Tabs } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router";
import Container from "../../components/layouts/Container";
import type { Route } from "./+types/project";

const PROJECT_TABS = [
    { title: "Summary", path: "summary" },
    { title: "Board", path: "board" },
    { title: "Backlog", path: "backlog" },
];

function ProjectTabs({ projectId }: { projectId: string }) {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const currentTab = PROJECT_TABS.findIndex(tab => pathname.startsWith(`/projects/${projectId}/${tab.path}`));

    return (
        <Box width="100%">
            <Tabs value={currentTab === -1 ? 1 : currentTab} onChange={(_, index) => navigate(PROJECT_TABS[index].path)}>
                {PROJECT_TABS.map(tab =>
                    <Tab key={tab.title} label={tab.title} />
                )}
            </Tabs>
        </Box>
    );
}

export default function Project({ params }: Route.ComponentProps) {
    return (
        <Stack spacing={1} alignItems="center">
            <ProjectTabs projectId={params.projectId} />
            <Container><Outlet /></Container>
        </Stack>
    );
}