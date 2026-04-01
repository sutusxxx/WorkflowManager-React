import { redirect } from "react-router";
import { getSession } from "~/session.server";
import type { Route } from "./+types";

export async function loader({ request }: Route.LoaderArgs) {
    const session = await getSession(request.headers.get("Cookie"));
    if (!session.get("user")) return redirect("/login");

    return redirect("/dashboard");
}