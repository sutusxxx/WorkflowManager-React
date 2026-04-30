import { Stack, Tooltip, Typography } from "@mui/material";
import { type Issue } from "../../../shared/types/issue";
import { memo } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_ISSUE_LIST } from "~/lib/query/graphql";
import SortableList from "../../../components/lists/SortableList";
import SortableListSkeleton from "../../../components/lists/SortableListSkeleton";
import { QUERY_PARAM } from "../../../shared/constants/queries.constant";
import Link from "../../../components/navigation/Link";
import IssueTypeIcon from "../components/IssueTypeIcon";
import PriorityIcon from "../components/PriorityIcon";
import { useMinDelay } from "../../../shared/hooks/useMinDelay";
import type { IssueListResponse } from "../types/issue-list.response";
import { StatusCategory } from "../../../shared/types/status";

type IssueListItemProps = {
    item: Issue;
}

function IssueListItem({ item }: IssueListItemProps) {
    return (
        <Stack
            direction="row"
            sx={{
                justifyContent: "space-between",
            }}
        >
            <Stack direction="row" alignItems="center">
                <IssueTypeIcon issueType={item.type} />
                <PriorityIcon priority={item.priority} />
                <Link
                    to={{ search: `?${QUERY_PARAM.SELECTED_ISSUE}=${item.key}` }}
                    sx={item.status.category === StatusCategory.DONE ? { textDecoration: "line-through" } : undefined}
                >
                    {item.key}
                </Link>
                <Tooltip title={item.status.name} placement="top" arrow>
                    <Typography paddingLeft={0.5} variant="body2">{item.title}</Typography>
                </Tooltip>
            </Stack>
        </Stack>
    );
}

const IssueListView = memo(({ projectId }: {
    projectId: string,
}) => {
    const { data, loading, error } = useQuery<IssueListResponse>(GET_ISSUE_LIST, { variables: { projectId } });

    const showSkeleton = useMinDelay(loading);

    if (showSkeleton) return <SortableListSkeleton />;
    if (error) return <Typography variant="body2" color="error">Cannot fetch issues</Typography>;
    if (!data?.projectById.issues.length) return <Typography variant="body2">Not Found</Typography>;

    return (
        <SortableList
            items={data.projectById.issues}
            onSort={(sorted) => { }}
            getId={(item) => item.key}
            renderComponent={(item) => (
                <IssueListItem item={item} />
            )}
        />
    );
});

export default IssueListView;