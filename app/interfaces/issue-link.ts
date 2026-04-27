import type { Issue } from "./issue";
import type { LinkType } from "./link-type";

export interface IssueLink {
    linkType: LinkType;
    targetIssue: Issue;
    createdAt: Date;
}