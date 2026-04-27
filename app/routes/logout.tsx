import { HttpStatusCode } from "axios";
import { redirect } from "react-router";
import { serverInstance } from "~/lib/api/server";

export async function loader() {
    const response = await serverInstance.get("/auth/logout");

    if (response.status === HttpStatusCode.Ok) {
        throw redirect("/login");
    }

    return response;
}