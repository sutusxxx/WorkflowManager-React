import { serverInstance } from "~/lib/api/server";
import { commitSession, getSession } from "~/session.server";
import type { Route } from "../+types/root";

export async function action({
    request,
}: Route.ActionArgs) {
    const requestBody = await request.json();
    const response = await serverInstance.post("/auth/login", requestBody);

    if (response.status !== 200) {
        return Response.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const { accessToken, username, email } = response.data;

    const session = await getSession(request.headers.get("Cookie"));

    session.set("accessToken", accessToken);
    session.set("user", { username, email });

    return Response.json(
        { username, email },
        {
            headers: { "Set-Cookie": await commitSession(session) },
        }
    );
}