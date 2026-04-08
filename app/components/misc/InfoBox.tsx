import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function InfoBox({ label, children }: { label: string, children: React.ReactNode }) {
    return (
        <Box sx={{ py: 1, borderBottom: "0.5px solid", borderColor: "divider" }}>
            <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>
                {label}
            </Typography>
            {children}
        </Box>
    );
}