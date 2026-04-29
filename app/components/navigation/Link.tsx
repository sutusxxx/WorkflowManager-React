import { Link as MuiLink, type SxProps, type Theme } from "@mui/material";
import type { ReactNode } from "react";
import { Link as ReactRouterLink } from "react-router";

export default function Link({ children, to, sx }: {
    children: ReactNode;
    to: string | { pathname?: string, search?: string, hash?: string};
    sx?: SxProps<Theme>;
}) {
    return (
        <MuiLink
            component={ReactRouterLink}
            variant="body2"
            to={to}
            viewTransition
            sx={{
                textDecoration: "none",
                ...sx,
            }}
        >
            {children}
        </MuiLink>
    )
}