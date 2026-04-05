import { Paper } from "@mui/material";
import MuiContainer from "@mui/material/Container";
import type { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
    return (
        <MuiContainer
            component={Paper}
            elevation={3}
            maxWidth="lg"
            sx={{
                borderRadius: "15px",
                padding: 2,
                margin: 1,
            }}
        >
            {children}
        </MuiContainer>
    );
}
