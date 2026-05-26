import type { Issue } from "./issue";
import type { Sprint } from "./sprint";
import type { Status } from "./status";

export type Project = {
    id: string;
    key: string;
    name: string;
    description: string;
    statuses: Status[];
    createdAt: Date;
    updatedAt: Date;
    sprints: Sprint[];
    issues: Issue[];
};