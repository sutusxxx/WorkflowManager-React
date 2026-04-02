import type { Route } from "./+types/dashboard";
import { getSession } from "~/session.server";

export async function loader({ request }: Route.LoaderArgs) {
    const session = await getSession(request.headers.get("Cookie"));

    return { user: session.get("user") };
}

export default function Page({ loaderData }: Route.ComponentProps) {
    return (
        <>asd</>
    );
}