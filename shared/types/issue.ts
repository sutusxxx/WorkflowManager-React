import type { IssueType } from "../enums/IssueType";
import type { Priority } from "../enums/Priority";
import type { Status } from "./status";

export type Issue = {
    id: string;
    key: string;
    title: string;
    storyPoints?: number;
    type: IssueType;
    status: Status;
    priority: Priority;
};