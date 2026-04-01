import { createCookieSessionStorage } from "react-router";

export type SessionData = {
    accessToken: string;
    user: {
        username: string;
        email: string;
    };
};

type SessionFlashData = {
    error: string;
};

const sessionSecret = import.meta.env.SESSION_SECRET || "s3cret1";

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>(
    {
      // a Cookie from `createCookie` or the CookieOptions to create one
      cookie: {
        name: "__session",
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secrets: [sessionSecret],
        secure: true,
      },
    },
  );

export { getSession, commitSession, destroySession };