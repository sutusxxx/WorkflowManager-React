import type { IssueType } from "~/features/issues/IssueType";
import type { Priority } from "~/features/issues/Priority";

export interface Issue {
    id: number;
    key: string;
    title: string;
    storyPoints?: number;
    type: IssueType;
    status: string;
    priority?: Priority;
}