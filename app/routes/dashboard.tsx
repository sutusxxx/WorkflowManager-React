import ProjectList from "~/components/projects/ProjectList";
import type { Route } from "../+types/root";
import { getSession } from "~/session.server";
import { redirect } from "react-router";
import { Stack } from "@mui/material";
import LogoutButton from "~/components/buttons/LogoutButton";

export async function loader({ request }: Route.LoaderArgs) {
    const session = await getSession(request.headers.get("Cookie"));
    if (!session.get("user")) return redirect("/login");

    return { user: session.get("user")};
}

export default function Dashboard() {
    return (
        <Stack>
            <ProjectList />
            <LogoutButton />
        </Stack>
    );
}