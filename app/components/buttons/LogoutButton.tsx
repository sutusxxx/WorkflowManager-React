import { Button, Typography } from "@mui/material";
import { useFetcher } from "react-router";

export default function LogoutButton() {
    const fetcher = useFetcher();

    return (
        <fetcher.Form method="GET" action="/logout">
            <Button type="submit">
                <Typography color="white">{fetcher.state !== "idle" ? "Logging out..." : "Logout"}</Typography>    
            </Button> 
        </fetcher.Form>
    )
}