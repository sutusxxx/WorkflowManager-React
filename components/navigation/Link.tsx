import { Link as MuiLink, type SxProps, type Theme } from "@mui/material";
import type { ReactNode } from "react";
import { Link as ReactRouterLink } from "react-router";

type LinkProps = {
    children: ReactNode;
    to: string | { pathname?: string, search?: string, hash?: string};
    sx?: SxProps<Theme>;
}

export default function Link({ children, to, sx }: LinkProps) {
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