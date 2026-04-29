import type { IssueType } from "~/features/issues/IssueType";
import type { Issue } from "./issue";
import type { Priority } from "~/features/issues/Priority";
import type { Status } from "./status";
import type { IssueLink } from "./issue-link";
import type { Project } from "./project";

export interface IssueDetail {
    id: number;
    title: string;
    key: string;
    description: string;
    storyPoints: number;
    dueDate: Date;
    status: Status;
    project: Project;
    parent: Issue;
    type: IssueType;
    children: Issue[];
    createdAt: Date;
    updatedAt: Date;
    comments: any;
    linkedIssues: IssueLink[];
    priority: Priority;
}