import { useMutation, useSuspenseQuery } from "@apollo/client/react";
import { CREATE_ISSSUE, GET_ISSUE_DETAIL, STATUS_TRANSITION, UPDATE_ISSUE } from "~/lib/query/graphql";
import type { IssueDetailResponse } from "../../../app/lib/types/issue-detail.response";
import type { UpdateIssue } from "../types/update-issue";
import type { CreateIssue } from "../types/create-issue";

export function useIssueDetail(issueKey: string) {
    const { data, error } = useSuspenseQuery<IssueDetailResponse>(GET_ISSUE_DETAIL, {
        variables: { issueKey },
        skip: !issueKey,
    });

    const [updateIssue] = useMutation(UPDATE_ISSUE);
    const [createIssue] = useMutation(CREATE_ISSSUE);
    const [changeStatus] = useMutation(STATUS_TRANSITION);

    const handleUpdate = (fields: Partial<UpdateIssue>) => {
        if (data?.issueByKey?.id) {
            updateIssue({ variables: { id: data.issueByKey.id, input: fields } });
        }
    };

    const handleCreate = (fields: CreateIssue) => {
        if (data?.issueByKey?.id) {
            createIssue({ variables: { input: fields } });
        }
    }

    const handleStatusChange = (newStatusId: string) => {
        if (data?.issueByKey?.id) {
            changeStatus({ variables: { issueId: data.issueByKey.id, input: { newStatusId } } });
        }
    };

    return {
        issue: data?.issueByKey,
        error,
        handleUpdate,
        handleCreate,
        handleStatusChange,
    };
}