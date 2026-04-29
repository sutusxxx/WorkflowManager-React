import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function MetaChip({ label, value, color }: {
    label: string,
    value: string,
    color: "default" | "primary" | "warning" | "success" | "secondary",
}) {
    return (
        <Stack direction="row" alignItems="center" gap={0.5}>
            <Typography variant="caption" color="text.secondary">{label}</Typography>
            <Chip label={value} color={color} size="small" />
        </Stack>
    );
}