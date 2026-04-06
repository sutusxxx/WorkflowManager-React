import { Stack, Typography } from "@mui/material";
import { useState } from "react";
import SortableList from "~/components/lists/SortableList";
import { IssueType } from "./IssueType";
import { Priority } from "./Priority";
import { type Issue } from "~/interfaces/issue";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "~/constants/queries.constant";
import { clientInstance } from "~/lib/api/client";
import SortableListSkeleton from "~/components/lists/SortableListSkeleton";

type IssueListResponse = {
    issues: Issue[],
};

const TEST_DATA = [
    { key: "DEV-1", title: "This is the first EPIC", type: IssueType.EPIC, status: "InProgress", priority: Priority.HIGH },
    { key: "DEV-2", title: "Impelement something", type: IssueType.STORY, status: "InReview", priority: Priority.BLOCKER },
    { key: "DEV-3", title: "Fix something", type: IssueType.BUGFIX, status: "InProgress", priority: Priority.MINOR },
    { key: "DEV-4", title: "Add something", type: IssueType.TASK, status: "TODO", priority: Priority.MEDIUM },
];

function IssueListItem({ item }: {
    item: Issue,
}) {
    return (
        <Stack
            direction="row"
            sx={{
                justifyContent: "space-between",
            }}
        >
            <Typography variant="body2">{item.key} {item.title}</Typography>
            <Typography variant="body2">{item.status}</Typography>
        </Stack>
    )
}

export default function IssueList({ projectKey }: {
    projectKey: string,
}) {
    const { data, isLoading, isError } = useQuery<IssueListResponse>({
        queryKey: [QUERY_KEY.ISSUES, projectKey],
        queryFn: async () => {
            const response = await clientInstance.get(`/projects/${projectKey}/issues`);

            return { issues: response.data ?? [] };
        },
    });

    if (isLoading) return <SortableListSkeleton />
    if (isError) return <Typography variant="body2" color="error">Cannot fetch issues</Typography>
    if (!data?.issues.length) return <Typography variant="body2">Not Found</Typography>

    return (
        <SortableList
            items={data.issues}
            onSort={(sorted) => {}}
            getId={(item) => item.key}
            renderComponent={(item) => (
                <IssueListItem item={item} />
            )}
        />
    );
}