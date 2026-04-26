import { redirect } from "react-router";
import type { Route } from "./+types";
import { serverInstance } from "~/lib/api/server";

export async function loader({ request }: Route.LoaderArgs) {
    const response = await serverInstance.get("/auth/me", {
        headers: {
            Cookie: request.headers.get("Cookie"),
        },
    });

    if (response.status === 403) {
        throw redirect("/login");
    }

    throw redirect("/dashboard");
}