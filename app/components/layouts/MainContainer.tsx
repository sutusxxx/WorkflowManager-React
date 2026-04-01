import { Container } from "@mui/material";
import type { ReactNode } from "react";

export default function MainContainer({ children }: { children: ReactNode }) {
    return (
        <Container maxWidth="xl">
            {children}
        </Container>
    )
}