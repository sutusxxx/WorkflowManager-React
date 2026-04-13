import type { IssueType } from "~/features/issues/IssueType";
import type { Issue } from "./issue";
import type { Priority } from "~/features/issues/Priority";

export interface IssueDetail {
    id: number;
    title: string;
    key: string;
    description: string;
    storyPoints: number;
    dueDate: Date;
    status: string;
    projectKey: string;
    parentKey: string;
    type: IssueType;
    subIssues: Issue[];
    createdAt: Date;
    updatedAt: Date;
    comments: any;
    linkedIssue: Map<string, string>;
    priority: Priority;
}