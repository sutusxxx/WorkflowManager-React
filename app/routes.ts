import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
    index("routes/index.tsx"),

    route("login", "routes/login.tsx"),

    layout("routes/layout.tsx", [
        route("dashboard", "routes/dashboard.tsx"),
    ]),

    route("api/:path", "routes/api.$.ts"),

    ...prefix("session", [
        route("login", "routes/session.login.ts"),
        route("logout", "routes/session.logout.ts")
    ]),
] satisfies RouteConfig;
