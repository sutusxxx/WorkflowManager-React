import { Paper } from "@mui/material";
import type { ReactNode } from "react";

type BorderedContainerProps = {
  children: ReactNode;
}

export default function BorderedContainer({ children }: BorderedContainerProps) {
  return (
    <Paper
      variant="outlined"
      sx={{
        padding: 2,
        borderRadius: "25px",
      }}
    >
      {children}
    </Paper>
  )
}