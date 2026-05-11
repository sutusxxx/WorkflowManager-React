import { useState, useEffect } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Typography,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const BFF_URL = "http://localhost:8080";

export default function LoginView() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 80);
        return () => clearTimeout(t);
    }, []);

    const handleLogin = () => {
        const currentPage =
            window.location.pathname === "/login" ? "/" : window.location.pathname;
        window.location.href = `${BFF_URL}/api/auth/login?redirectTo=${encodeURIComponent(currentPage)}`;
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "grey.100",
                px: 2,
            }}
        >
            <Card
                elevation={0}
                sx={{
                    width: "100%",
                    maxWidth: 400,
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 3,
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(16px)",
                    transition: "opacity 0.4s ease, transform 0.4s ease",
                }}
            >
                <CardContent sx={{ p: 4 }}>

                    {/* Logo / Brand */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
                        <Box
                            sx={{
                                width: 36,
                                height: 36,
                                borderRadius: 2,
                                bgcolor: "primary.main",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <LockOutlinedIcon sx={{ color: "primary.contrastText", fontSize: 20 }} />
                        </Box>
                        <Typography variant="h6" fontWeight={600}>
                            Workflow
                        </Typography>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {/* Heading */}
                    <Typography variant="h5" fontWeight={500} gutterBottom>
                        Welcome back
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        Sign in to continue to your workspace
                    </Typography>

                    {/* Login Button */}
                    <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        startIcon={<LoginIcon />}
                        onClick={handleLogin}
                        sx={{ borderRadius: 2, py: 1.5, textTransform: "none", fontSize: 15 }}
                    >
                        Continue with SSO
                    </Button>

                    {/* Hint */}
                    <Typography
                        variant="caption"
                        color="text.disabled"
                        display="block"
                        textAlign="center"
                        sx={{ mt: 2 }}
                    >
                        You'll be redirected to your identity provider to authenticate securely.
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    {/* Footer */}
                    <Typography
                        variant="caption"
                        color="text.disabled"
                        display="block"
                        textAlign="center"
                        letterSpacing={1}
                        sx={{ textTransform: "uppercase" }}
                    >
                        Secured by Keycloak
                    </Typography>

                </CardContent>
            </Card>

            {/* Below card */}
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Don't have an account?{" "}
                <Typography
                    component="a"
                    href="/register"
                    variant="body2"
                    color="primary"
                    sx={{ textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
                >
                    Contact your administrator
                </Typography>
            </Typography>
        </Box>
    );
}