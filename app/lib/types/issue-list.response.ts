import type { Issue } from "../../../shared/types/issue";
import type { Status } from "../../../shared/types/status";

export type IssueListResponse = {
    projectById: {
        id: string;
        key: string;
        statuses: Status[];
        issues: Issue[],
    }
};