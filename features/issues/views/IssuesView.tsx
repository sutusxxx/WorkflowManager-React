import { Divider, IconButton, Menu, Stack, Typography } from "@mui/material";
import { memo } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_SPRINTS } from "~/lib/query/graphql";
import SortableListSkeleton from "../../../components/lists/SortableListSkeleton";
import { useMinDelay } from "../../../shared/hooks/useMinDelay";
import type { IssueListResponse } from "../../../app/lib/types/issue-list.response";
import IssuesList from "../components/IssueList";
import GridContainer from "../../../components/layouts/GridContainer";
import GridItem from "../../../components/layouts/GridItem";
import IssueListHeader from "../components/IssueListHeader";

const IssuesView = memo(({ projectId }: {
    projectId: string,
}) => {
    const { data, loading, error } = useQuery<IssueListResponse>(GET_SPRINTS, { variables: { projectId } });

    const showSkeleton = useMinDelay(loading);

    if (showSkeleton) return <SortableListSkeleton />;
    if (error) return <Typography variant="body2" color="error">Cannot fetch issues</Typography>;
    if (!data?.projectById.sprints[0].issues.length) return <Typography variant="body2">Not Found</Typography>;

    const sprints = data.projectById.sprints;

    return (
        <GridContainer columns={1}>
            {sprints.sort((a, b) => a.active ? 1 : 0).map((sprint, index) => (
                <GridItem key={sprint.id}>
                    {index !== 0 && <Divider sx={{ margin: 1 }} />}
                    <IssueListHeader sprint={sprint} />
                    <IssuesList sprintId={sprint.id} issues={sprint.issues} />
                </GridItem>
            ))}
        </GridContainer>
    )
});

export default IssuesView;