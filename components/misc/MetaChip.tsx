import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function MetaChip({ label, value, color }: {
    label: string,
    value: string,
    color: "default" | "primary" | "warning" | "success" | "secondary",
}) {
    return (
        <Stack direction="column">
            <Typography variant="caption" color="text.secondary">{label}</Typography>
            <Chip label={value} color={color} size="small" sx={{ minWidth: 40, width: "fit-content" }} />
        </Stack>
    );
}