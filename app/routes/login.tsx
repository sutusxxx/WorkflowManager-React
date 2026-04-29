import LoginView from "../../features/login/views/LoginView";
import type { Route } from "./+types/login";
import { Box } from "@mui/material";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Page() {
  return (
    <Box height="100vh" display="flex" justifyContent="center" alignItems="center">
      <LoginView />
    </Box>
  );
}
