import { Button } from "@mui/material";
import { useFetcher } from "react-router";

export default function LogoutButton() {
    const fetcher = useFetcher();

    return (
        <fetcher.Form method="GET" action="/session/logout">
            <Button type="submit">{fetcher.state !== "idle" ? "Logging out..." : "Logout"}</Button> 
        </fetcher.Form>
    )
}