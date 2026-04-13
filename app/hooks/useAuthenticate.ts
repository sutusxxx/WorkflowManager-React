import { useState } from "react";
import { useNavigate } from "react-router";
import { clientInstance } from "~/lib/api/client";

export type useAuthenticateHookResult = {
  fields: {
    username: string,
    password: string,
  },
  onChange: {
    username: (value: string) => void,
    password: (value: string) => void,
  },
  authenticate: () => void,
  error: string | null,
};

export function useAuthenticate(): useAuthenticateHookResult {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const authenticate = async () => {
    await clientInstance.post("/auth/authenticate", { username, password })
      .then(() => navigate("/dashboard"))
      .catch(() => setError("Login failed. Please check your credentials and try again."));
  };

  return {
    fields: {
      username,
      password,
    },
    onChange: {
      username: setUsername,
      password: setPassword,
    },
    authenticate,
    error,
  };
}