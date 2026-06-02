import MuiContainer from "@mui/material/Container";
import type { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
    return (
        <MuiContainer
            maxWidth="lg"
            sx={{ margin: 1 }}
        >
            {children}
        </MuiContainer>
    );
}
