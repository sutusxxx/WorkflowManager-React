import { createTheme } from "@mui/material";

export const theme = createTheme({
    components: {
        MuiTextField: {
            defaultProps: {
                variant: "standard",
                fullWidth: true,
                InputLabelProps: { shrink: true },
            },
        },
    },
})