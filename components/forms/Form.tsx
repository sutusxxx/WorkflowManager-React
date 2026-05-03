import { Box, Button, Stack, Typography } from "@mui/material";
import type { ReactNode, SubmitEventHandler } from "react"

export type FormProps = {
    title: ReactNode;
    onSubmit: SubmitEventHandler<HTMLFormElement>;
    children: ReactNode;
    onReset?: () => void;
}

export default function Form({ title, onSubmit, children, onReset }: FormProps) {
    return (
        <Box
            component="form"
            onSubmit={onSubmit}
            sx={{ maxWidth: 560, width: "100%" }}
        >
            <Typography variant="h6" fontWeight={500} mb={3}>
                {title}
            </Typography>

            <Stack spacing={2}>
                {children}

                <Box display="flex" justifyContent="flex-end" gap={1} pt={1}>
                    {onReset &&
                    <Button variant="outlined" onClick={onReset}>Reset</Button>}
                    <Button type="submit" variant="contained">Submit</Button>
                </Box>
            </Stack>
        </Box>
    )
}