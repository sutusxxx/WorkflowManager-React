import LoginForm from "~/features/login/LoginForm";
import type { Route } from "./+types/login";
import { Box } from "@mui/material";
import { data, redirect } from "react-router";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Page() {
  return (
    <Box height="100vh" display="flex" justifyContent="center" alignItems="center">
      <LoginForm />
    </Box>
  );
}
