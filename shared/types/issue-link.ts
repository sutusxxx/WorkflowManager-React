import type { Issue } from "./issue";
import type { LinkType } from "../enums/link-type";

export type IssueLink = {
    linkType: LinkType;
    targetIssue: Issue;
    createdAt: Date;
};