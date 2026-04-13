import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    List,
    ListItem,
    styled,
    Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Outlet } from "react-router";
import Sidebar from "~/components/misc/Sidebar";
import { useState } from "react";
import ProjectList from "~/features/projects/ProjectList";
import type { Route } from "./+types/layout";
import { HEADER_HEIGHT, SIDEBAR_WIDTH } from "~/constants/components.constant";
import Header from "~/components/misc/Header";
import { serverInstance } from "~/lib/api/server";

export async function loader() {
    const session = await serverInstance.get("/auth/me")

    return { user: session };
}

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
    open?: boolean;
}>(({ theme }) => ({
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginTop: `${HEADER_HEIGHT}px`,
    marginLeft: `-${SIDEBAR_WIDTH}px`,
    variants: [
        {
            props: ({ open }) => open,
            style: {
                transition: theme.transitions.create("margin", {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                marginLeft: 0,
            },
        },
    ],
}));

export default function Layout({ loaderData }: Route.ComponentProps) {
    const [open, setOpen] = useState<boolean>(true);

    const user = loaderData.user;

    return (
        <Box display="flex">
            <Header open={open} onSidebarOpen={() => setOpen(true)} authenticated={user != null} />
            <Sidebar open={open} onClose={() => setOpen(false)} width={SIDEBAR_WIDTH}>
                <List>
                    <ListItem key="dashboard" disablePadding sx={{ display: "block" }}>
                        <Accordion elevation={0} square>
                            <AccordionSummary
                                expandIcon={<ArrowDropDownIcon />}
                                aria-controls="dashboard"
                                id="dashboard-header"
                            >
                                <Typography fontWeight="bold">Dashboards</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {/* // TODO: Add dashboard endpoint... */}
                            </AccordionDetails>
                        </Accordion>
                    </ListItem>
                    <ListItem key="projects" disablePadding sx={{ display: "block" }}>
                        <Accordion elevation={0} square>
                            <AccordionSummary
                                expandIcon={<ArrowDropDownIcon />}
                                aria-controls="projects-content"
                                id="projects-header"
                            >
                                <Typography fontWeight="bold">Projects</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <ProjectList />
                            </AccordionDetails>
                        </Accordion>
                    </ListItem>
                </List>
            </Sidebar>
            <Main open={open}>
                <Outlet />
            </Main>
        </Box>
    )
}