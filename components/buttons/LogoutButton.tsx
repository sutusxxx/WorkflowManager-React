import { Button, Typography } from "@mui/material";
import { useFetcher, useNavigate } from "react-router";

const BFF_URL = "http://localhost:8080";

export function useLogout() {
    const navigate = useNavigate();

    const logout = async () => {
        await fetch(`${BFF_URL}/api/auth/logout`, {
            method: "POST",
            credentials: "include",
        });
        navigate("/login");
    };

    return logout;
}

export default function LogoutButton() {
    const logout = useLogout();

    return (
        <Button onClick={logout}>
            <Typography color="white">Logout</Typography>
        </Button>
    )
}