import { serverInstance } from "~/lib/api/server";
import { destroySession, getSession } from "~/session.server";
import type { Route } from "./+types/api.$";
import { HTTP_ERRORS } from "~/constants/errors.constant";

async function proxy(request: Request, path: string) {
    const session = await getSession(request.headers.get("Cookie"));
    const accessToken = session.get("accessToken");

    if (!accessToken) {
        return Response.json({ message: HTTP_ERRORS[401] }, { status: 401 });
    }

    try {
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
                { error: HTTP_ERRORS[401]},
                {
                    headers: { "Set-Cookie": await destroySession(session) },
                }
            );
        }

        const data = response.data;

        return Response.json(data, { status: response.status });
    } catch (error) {
        return Response.json({ error: HTTP_ERRORS[500] }, { status: 500 });
    }
}

export async function loader({ request, params }: Route.LoaderArgs) {
    return proxy(request, params.path);
}

export async function action({ request, params }: Route.ActionArgs) {
    return proxy(request, params.path);
}