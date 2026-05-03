import { useMutation, useSuspenseQuery } from "@apollo/client/react";
import { GET_ISSUE_DETAIL, STATUS_TRANSITION, UPDATE_ISSUE } from "~/lib/query/graphql";
import type { IssueDetailResponse } from "../types/issue-detail.response";
import type { UpdateIssue } from "../types/update-issue";

export function useIssueDetail(issueKey: string) {
    const { data, error } = useSuspenseQuery<IssueDetailResponse>(GET_ISSUE_DETAIL, {
        variables: { issueKey },
        skip: !issueKey,
    });

    const [updateIssue, { loading: updating }] = useMutation(UPDATE_ISSUE);

    const [changeStatus] = useMutation(STATUS_TRANSITION);

    const handleUpdate = (fields: Partial<UpdateIssue>) => {
        if (data?.issueByKey?.id) {
            updateIssue({ variables: { id: data.issueByKey.id, input: fields } });
        }
    };

    const handleStatusChange = (newStatusId: string) => {
        if (data?.issueByKey?.id) {
            changeStatus({ variables: { issueId: data.issueByKey.id, input: { newStatusId } } });
        }
    };

    return {
        issue: data?.issueByKey,
        error,
        updating,
        handleUpdate,
        handleStatusChange,
    };
}