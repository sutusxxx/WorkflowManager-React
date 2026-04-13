import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    index("routes/index.tsx"),

    route("login", "routes/login.tsx"),

    layout("routes/layout.tsx", [
        route("dashboard", "routes/dashboard.tsx"),
        route("settings", "routes/settings.tsx"),

        route("projects/:projectKey", "routes/project.tsx", [
            route("summary", "routes/project.summary.tsx"),
            route("board", "routes/project.board.tsx"),
            route("issues", "routes/project.issues.tsx"),
            route("issues/:issueKey", "routes/issue.tsx"),
        ]),
    ]),
] satisfies RouteConfig;
