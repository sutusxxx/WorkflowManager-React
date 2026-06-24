import { Button, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { memo } from "react";
import AddIcon from "@mui/icons-material/Add";
import BorderedContainer from "../../../components/layouts/BorderedContainer";
import BacklogIssueList from "../components/BacklogIssueList";
import { useBacklog } from "../hooks/useBacklog";
import GridContainer from "../../../components/layouts/GridContainer";
import GridItem from "../../../components/layouts/GridItem";
import IssueListHeader from "../components/IssueListHeader";
import SprintIssueList from "../components/SprintIssueList";
import useSprintList from "../hooks/useSprintList";

const BacklogView = memo(({ projectId }: {
    projectId: string,
}) => {
    const { data: backlogData, error: backlogError, loadMore } = useBacklog(projectId);
    const { data: sprintData, error: sprintError } = useSprintList(projectId);

    return (
        <GridContainer columns={1}>
            {sprintData && !sprintError &&
                <GridItem>
                    <BorderedContainer>
                        <Stack gap={1}>
                            <IssueListHeader sprint={sprintData.sprints.items[0]} />
                            <SprintIssueList sprintId={sprintData.sprints.items[0].id} issues={sprintData.sprints.items[0].issues} />
                        </Stack>
                    </BorderedContainer>
                </GridItem>}
            <GridItem>
                {backlogData && !backlogError &&
                    <BorderedContainer>
                        <Stack gap={1}>
                            <Typography variant="body2" fontWeight={500}>
                                Backlog
                            </Typography>
                            <BacklogIssueList
                                issues={backlogData.edges.map(edge => edge.node)}
                                sprintId={sprintData?.sprints.items[0].id ?? null}
                            />
                            {backlogData.pageInfo.hasNextPage &&
                                <Button onClick={loadMore}>Load more</Button>
                            }
                            <Tooltip title="Add issue" arrow>
                                <IconButton size="small" sx={{ width: "fit-content" }}>
                                    <AddIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    </BorderedContainer>}
            </GridItem>
        </GridContainer>
    )
});

export default BacklogView;