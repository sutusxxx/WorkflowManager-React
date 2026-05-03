import type { IssueType } from "../../../shared/enums/IssueType";
import type { Priority } from "../../../shared/enums/Priority";

export type CreateIssue = {
    title: string;
    description: string;
    storyPoints: number;
    priority: Priority;
    dueDate: Date;
    parentId: string;
    projectId: string;
    type: IssueType;
}