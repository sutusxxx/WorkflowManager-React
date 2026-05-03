import type { Issue } from "./issue";
import type { Status } from "./status";
import type { IssueLink } from "./issue-link";
import type { Project } from "./project";
import type { IssueType } from "../enums/IssueType";
import type { Priority } from "../enums/Priority";
import type { User } from "./user";

export type IssueDetail = {
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
    assigned: User;
    reporter: User;
};