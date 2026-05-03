import type { Priority } from "../../../shared/enums/Priority";

export type UpdateIssue = {
    title: string;
    description: string;
    storyPoints: number;
    priority: Priority;
    dueDate: Date;
}