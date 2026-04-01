import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes";

export default [
    route("login", "routes/login.tsx"),
    route("dashboard", "routes/dashboard.tsx"),
    route("api/:path", "routes/api.$.ts"),
    ...prefix("session", [
        route("login", "routes/session.login.ts"),
        route("logout", "routes/session.logout.ts")
    ]),
] satisfies RouteConfig;
