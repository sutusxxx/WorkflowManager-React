import { Box, Stack, Tab, Tabs } from "@mui/material";
import { Outlet, redirect, useLocation, useNavigate } from "react-router";
import type { Route } from "./+types/project";
import { getSession } from "~/session.server";
import Container from "~/components/layouts/Container";

const PROJECT_TABS = [
    { title: "Summary", path: "summary" },
    { title: "Board", path: "board" },
    { title: "Issues", path: "issues" },
];

export async function loader({ request }: Route.LoaderArgs) {
    const session = await getSession(request.headers.get("Cookie"));

    if (!session.has("user")) {
        return redirect("/login")
    }

    return { user: session.get("user") };
}

export default function Project({ params }: Route.ComponentProps) {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const currentTab = PROJECT_TABS.findIndex(tab => pathname.startsWith(`/projects/${params.projectKey}/${tab.path}`));

    return (
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
                        <Tab label={tab.title} />
                    )}
                </Tabs>
            </Box>
            <Container>
                <Outlet />
            </Container>
        </Stack>
    )
}