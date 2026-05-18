import { Grid } from "@mui/material";
import type { ReactNode } from "react";

export default function GridContainer({ children, columns }: { children: ReactNode, columns?: number }) {
  return (
    <Grid container spacing={1} columns={columns}>
      {children}
    </Grid>
  )
}