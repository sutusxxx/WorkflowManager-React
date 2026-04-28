import type { Issue } from "./issue";
import type { Status } from "./status";

export interface Project {
    id: string;
    key: string;
    name: string;
    description: string;
    statuses: Status[];
    createdAt: Date;
    updatedAt: Date;
    issues: Issue[];
}