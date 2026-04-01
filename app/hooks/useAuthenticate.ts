import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";

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

  const mutation = useMutation({
    mutationFn: (credentials: { username: string; password: string }) => {
      return fetch("/session/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      });
    },
    onSuccess: (response) => {
      console.log(response);
      navigate("/dashboard");
    },
    onError: (error) => {
      console.log(error);
      setError("Login failed. Please check your credentials and try again.");
    },
  });

  return {
    fields: {
      username,
      password,
    },
    onChange: {
      username: setUsername,
      password: setPassword,
    },
    authenticate: () => mutation.mutate({ username, password }),
    error,
  };
}