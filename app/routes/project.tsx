import { Box, Stack, Tab, Tabs } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router";
import Container from "../../components/layouts/Container";
import IssueDetailDialog from "../../features/issues/components/IssueDetailDialog";
import type { Route } from "./+types/project";

const PROJECT_TABS = [
    { title: "Summary", path: "summary" },
    { title: "Board", path: "board" },
    { title: "Issues", path: "issues" },
];

export default function Project({ params }: Route.ComponentProps) {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const currentTab = PROJECT_TABS.findIndex(tab => pathname.startsWith(`/projects/${params.projectId}/${tab.path}`));

    return (
        <>
            <Stack
                spacing={1}
                sx={{
                    alignItems: "center",
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                    }}
                >
                    <Tabs value={currentTab === -1 ? 1 : currentTab} onChange={(_, index) => navigate(PROJECT_TABS[index].path)}>
                        {PROJECT_TABS.map(tab =>
                            <Tab key={tab.title} label={tab.title} />
                        )}
                    </Tabs>
                </Box>
                <Container>
                    <Outlet />
                </Container>
            </Stack>
            <IssueDetailDialog />
        </>
    )
}