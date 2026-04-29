import { Box, ClickAwayListener, Dialog, DialogContent, Stack, Tab, Tabs } from "@mui/material";
import { Outlet, useLocation, useNavigate, useSearchParams } from "react-router";
import type { Route } from "./+types/project";
import Container from "../../components/layouts/Container";
import { QUERY_PARAM } from "../../shared/constants/queries.constant";
import { Suspense } from "react";
import IssueDetailView, { IssueDetailSkeleton } from "../../features/issues/views/IssueDetailView";

const PROJECT_TABS = [
    { title: "Summary", path: "summary" },
    { title: "Board", path: "board" },
    { title: "Issues", path: "issues" },
];

export default function Project({ params }: Route.ComponentProps) {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const currentTab = PROJECT_TABS.findIndex(tab => pathname.startsWith(`/projects/${params.projectId}/${tab.path}`));

    const handleIssueDialogClose = () => setSearchParams(prev => {
        prev.delete(QUERY_PARAM.SELECTED_ISSUE);
        return prev;
    });

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
            {searchParams.has(QUERY_PARAM.SELECTED_ISSUE) &&
                <ClickAwayListener onClickAway={handleIssueDialogClose}>
                    <Dialog open onClose={handleIssueDialogClose} fullWidth>
                        <DialogContent>
                            <Suspense fallback={<IssueDetailSkeleton />}>
                                <IssueDetailView issueKey={searchParams.get(QUERY_PARAM.SELECTED_ISSUE)!} />
                            </Suspense>
                        </DialogContent>
                    </Dialog>
                </ClickAwayListener>
            }
        </>
    )
}