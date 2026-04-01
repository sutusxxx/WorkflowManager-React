import { Accordion, AccordionDetails, AccordionSummary, AppBar, Box, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Outlet } from "react-router";
import LogoutButton from "~/components/buttons/LogoutButton";
import Sidebar from "~/components/misc/Sidebar";
import { useState } from "react";
import ProjectList from "~/components/projects/ProjectList";

export default function MainLayout() {
    const [open, setOpen] = useState<boolean>(true);

    return (
        <Box>
            <AppBar>
                <Toolbar>
                    <Stack
                        direction="row"
                        sx={{
                            width: "100%",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={() => setOpen(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <LogoutButton />
                    </Stack>
                </Toolbar>
            </AppBar>
            <Sidebar open={open} onClose={() => setOpen(false)} variant="permanent">
                <List>
                    <ListItem key="projects" disablePadding sx={{ display: 'block' }}>
                        <Accordion elevation={0}>
                            <AccordionSummary
                                expandIcon={<ArrowDropDownIcon />}
                                aria-controls="projects-content"
                                id="projects-header"
                            >
                                <Typography component="span">Projects</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <ProjectList />
                            </AccordionDetails>
                        </Accordion>
                    </ListItem>
                </List>
            </Sidebar>
            <Outlet />
        </Box>
    )
}