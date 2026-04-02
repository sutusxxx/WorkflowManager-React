import {
    IconButton,
    styled,
    Toolbar,
    AppBar as MuiAppBar,
    type AppBarProps as MuiAppBarProps,
} from "@mui/material";
import { HEADER_HEIGHT, SIDEBAR_WIDTH } from "~/constants/components.constant";
import LoginButton from "../buttons/LoginButton";
import LogoutButton from "../buttons/LogoutButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
                marginLeft: `${SIDEBAR_WIDTH}px`,
                transition: theme.transitions.create(["margin", "width"], {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));


export default function Header({
    authenticated,
    open,
    onSidebarOpen,
}: { authenticated: boolean, open: boolean, onSidebarOpen: () => void }) {
    return (
        <AppBar
            open={open}
            variant="outlined"
            sx={{ height: `${HEADER_HEIGHT}px`, position: "fixed" }}
        >
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={onSidebarOpen}
                    sx={open ? { display: "none" } : undefined}
                >
                    <ChevronRightIcon />
                </IconButton>
                {
                    authenticated
                        ? <LogoutButton />
                        : <LoginButton />
                }
            </Toolbar>
        </AppBar>
    )
}