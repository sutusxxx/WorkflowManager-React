import LoginForm from "~/components/forms/LoginForm";
import type { Route } from "./+types/login";
import { Box } from "@mui/material";
import { commitSession, getSession } from "~/session.server";
import { data, redirect } from "react-router";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({
  request,
}: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  if (session.has("user")) {
    return redirect("/dashboard");
  }

  return data(
    { error: session.get("error") },
    {
      headers: { "Set-Cookie": await commitSession(session) },
    },
  );
}

export default function Page() {
  return (
    <Box height="100vh" display="flex" justifyContent="center" alignItems="center">
      <LoginForm />
    </Box>
  );
}
