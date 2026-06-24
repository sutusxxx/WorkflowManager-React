import type { Connection } from "../../../shared/interfaces/connection";
import type { Project } from "../../../shared/types/project";

export type ProjectListResponse = {
    projects: Connection<Project>;
};