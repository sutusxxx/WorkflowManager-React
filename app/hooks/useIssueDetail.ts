import { useMutation, useQuery } from "@apollo/client/react";
import type { IssueDetail } from "~/interfaces/issue-detail";
import type { IssueDetailResponse } from "~/interfaces/issue-detail.response";
import { GET_ISSUE_DETAIL, STATUS_TRANSITION, UPDATE_ISSUE } from "~/lib/query/graphql";

export function useIssueDetail(issueKey: string) {
    const { data, loading, error } = useQuery<IssueDetailResponse>(GET_ISSUE_DETAIL, {
        variables: { issueKey },
        skip: !issueKey,
    });

    const [updateIssue, { loading: updating }] = useMutation(UPDATE_ISSUE);

    const [changeStatus] = useMutation(STATUS_TRANSITION);

    const handleUpdate = (fields: Partial<IssueDetail>) => {
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
        loading,
        error,
        updating,
        handleUpdate,
        handleStatusChange,
    };
}