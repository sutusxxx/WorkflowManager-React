import { Drawer, IconButton, styled } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import type { ReactNode } from "react";


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
    width,
    children,
}: { open: boolean, onClose: () => void, width?: number, children?: ReactNode }) {
    return (
        <Drawer
            open={open}
            variant="persistent"
            anchor="left"
            sx={{
                width,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width,
                    boxSizing: 'border-box',
                },
            }}
        >
            <DrawerHeader>
                <IconButton onClick={onClose}>
                    <ChevronLeftIcon />
                </IconButton>
            </DrawerHeader>
            {children}
        </Drawer>
    )
}