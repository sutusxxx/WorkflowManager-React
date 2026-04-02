import { redirect } from "react-router";
import type { Route } from "./+types";

export async function loader({ request }: Route.LoaderArgs) {
    redirect("/dashboard");
}