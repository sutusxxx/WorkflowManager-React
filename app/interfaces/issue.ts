import type { IssueType } from "~/features/issues/IssueType";
import type { Priority } from "~/features/issues/Priority";
import type { Status } from "./status";

export interface Issue {
    id: string;
    key: string;
    title: string;
    storyPoints?: number;
    type: IssueType;
    status: Status;
    priority: Priority;
}