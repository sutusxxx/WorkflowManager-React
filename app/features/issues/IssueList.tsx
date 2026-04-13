import { Stack, Typography } from "@mui/material";
import SortableList from "~/components/lists/SortableList";
import { type Issue } from "~/interfaces/issue";
import { QUERY_PARAM } from "~/constants/queries.constant";
import SortableListSkeleton from "~/components/lists/SortableListSkeleton";
import { useMinDelay } from "~/hooks/useMinDelay";
import { memo } from "react";
import Link from "~/components/navigation/Link";
import { useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";

type IssueListResponse = {
    issues: Issue[],
};

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
            <Stack direction="row" spacing={1}>
                <Link to={{ search: `?${QUERY_PARAM.SELECTED_ISSUE}=${item.key}` }}>
                    {item.key}
                </Link>
                <Typography variant="body2">{item.title}</Typography>
            </Stack>
            <Typography variant="body2">{item.status}</Typography>
        </Stack>
    );
}

const IssueList = memo(({ projectId }: {
    projectId: number,
}) => {
    const { data, loading, error } = useQuery<IssueListResponse>(gql`
        query GetIssues($projectId: ID!) {
            issues(projectId: $projectId) {
                id
                key
                title
            }
        }
        `, { variables: { projectId: 1 } });

    const showSkeleton = useMinDelay(loading);

    if (showSkeleton) return <SortableListSkeleton />;
    if (error) return <Typography variant="body2" color="error">Cannot fetch issues</Typography>;
    if (!data?.issues.length) return <Typography variant="body2">Not Found</Typography>;

    return (
        <SortableList
            items={data.issues}
            onSort={(sorted) => { }}
            getId={(item) => item.key}
            renderComponent={(item) => (
                <IssueListItem item={item} />
            )}
        />
    );
});

export default IssueList;