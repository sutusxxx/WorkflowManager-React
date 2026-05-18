import { Grid } from "@mui/material";
import type { ReactNode } from "react";

export default function GridItem({ children, size }: { children: ReactNode, size?: number }) {
  return (
    <Grid size={size ?? 1}>
      {children}
    </Grid>
  )
}