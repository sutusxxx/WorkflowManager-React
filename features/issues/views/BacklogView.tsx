import { Button, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { memo, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import BorderedContainer from "../../../components/layouts/BorderedContainer";
import BacklogIssueList from "../components/BacklogIssueList";
import { useBacklog } from "../hooks/useBacklog";
import GridContainer from "../../../components/layouts/GridContainer";
import GridItem from "../../../components/layouts/GridItem";
import SprintHeader from "../components/SprintHeader";
import SprintIssueList from "../components/SprintIssueList";
import useSprintList from "../hooks/useSprintList";
import Dialog from "../../../components/misc/Dialog";
import MoveToSprint from "../components/MoveToSprint";
import type { Issue } from "../../../shared/types/issue";

const BacklogView = memo(({ projectId }: {
    projectId: string,
}) => {
    const { data: backlogData, error: backlogError, loadMore } = useBacklog(projectId);
    const { data: sprintData, error: sprintError } = useSprintList(projectId);

    const [issueToMove, setIssueToMove] = useState<Issue | null>(null);

    return (
        <>
            <GridContainer columns={1}>
                {sprintData && !sprintError &&
                    sprintData.sprints.items.map(sprint => (
                        <GridItem key={sprint.id}>
                            <BorderedContainer>
                                <Stack gap={1}>
                                    <SprintHeader sprint={sprint} />
                                    <SprintIssueList sprintId={sprint.id} issues={sprint.issues} />
                                </Stack>
                            </BorderedContainer>
                        </GridItem>
                    ))}
                <GridItem>
                    {backlogData && !backlogError &&
                        <BorderedContainer>
                            <Stack gap={1}>
                                <Typography variant="body2" fontWeight={500}>
                                    Backlog
                                </Typography>
                                <BacklogIssueList
                                    issues={backlogData.edges.map(edge => edge.node)}
                                    onMoveIssue={(issue) => setIssueToMove(issue)}
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
            <Dialog open={!!issueToMove} onClose={() => setIssueToMove(null)}>
                <MoveToSprint
                    sprints={sprintData?.sprints.items.length ? sprintData.sprints.items : []}
                    issue={issueToMove!}
                />
            </Dialog>
        </>
    )
});

export default BacklogView;