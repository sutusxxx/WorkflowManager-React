import { serverInstance } from "~/lib/api/server";
import { destroySession, getSession } from "~/session.server";
import type { Route } from "./+types/api.$";

async function proxy(request: Request, path: string) {
    const session = await getSession(request.headers.get("Cookie"));
    const accessToken = session.get("accessToken");

    if (!accessToken) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const response = await serverInstance.request({
        method: request.method,
        url: path,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        data: request.method === "GET" ? undefined : request.body,
    });

    if (response.status === 401) {
        return Response.json(
            { error: "Unauthorized" },
            {
                headers: { "Set-Cookie": await destroySession(session) },
            }
        );
    }

    const data = response.data;

    return Response.json(data, { status: response.status });
}

export async function loader({ request, params }: Route.LoaderArgs) {
    return proxy(request, params.path);
}

export async function action({ request, params }: Route.ActionArgs) {
    return proxy(request, params.path);
}