import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { clientInstance } from "~/lib/api/client";

export function useLogout() {
    const navigate = useNavigate();

    const logout = async () => {
        await clientInstance.post("auth/logout");
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