import { Box, Divider, Drawer, IconButton, styled } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import type { ReactNode } from "react";

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function Sidebar({
    open,
    onClose,
    variant,
    children,
}: { open: boolean, onClose: () => void, variant?: "persistent" | "permanent" | "temporary", children?: ReactNode }) {
    return (
        <Drawer
            open={open}
            variant="persistent"
            anchor="left"
        >
            <Box sx={{ width: drawerWidth }}>
                <DrawerHeader>
                    <IconButton onClick={onClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </DrawerHeader>
                <Divider />
                {children}
            </Box>
        </Drawer>
    )
}