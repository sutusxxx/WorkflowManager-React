import { Box, Button, Chip, Divider, Grid, IconButton, Paper, Skeleton, Stack, Typography } from "@mui/material";
import { format } from "date-fns";
import { memo, useState } from "react";
import StatusSelect from "../components/StatusSelect";
import AddIcon from "@mui/icons-material/Add";
import { SelectableTextInput } from "../../../components/inputs/SelectableTextInput";
import InfoBox from "../../../components/misc/InfoBox";
import MetaChip from "../../../components/misc/MetaChip";
import { QUERY_PARAM } from "../../../shared/constants/queries.constant";
import Link from "../../../components/navigation/Link";
import { useIssueDetail } from "../hooks/useIssueDetail";
import UpdateIssueForm from "../components/UpdateIssueForm";
import { IssueType } from "../../../shared/enums/IssueType";
import CreateIssueForm from "../components/CreateIssueForm";
import IssueTypeIcon from "../components/IssueTypeIcon";
import PriorityIcon from "../components/PriorityIcon";
import { priorityToTextConverter } from "../../../shared/helpers/converters";
import SubIssueList from "../components/SubIssueList";
import Dialog from "../../../components/misc/Dialog";

export function IssueDetailSkeleton() {
    return (
        <Stack spacing={2} sx={{ p: 3 }}>
            <Stack direction="row" alignItems="center" gap={1}>
                <Skeleton width={100} height={30} />
            </Stack>
            <Skeleton width={280} height={60} />
            <Divider />
            <Grid container spacing={2}>
                <Grid size={8}>
                    <Skeleton height={40} />
                </Grid>
                <Grid size={4}>
                    <Skeleton height={40} />
                </Grid>
            </Grid>
            <Divider />
            <Grid container spacing={2}>
                <Grid size={6}>
                    <Skeleton variant="rectangular" height={160} />
                </Grid>
                <Grid size={6}>
                    <Skeleton variant="rectangular" height={160} />
                </Grid>
            </Grid>
            <Divider />
            <Skeleton variant="rectangular" height={100} />
            <Skeleton variant="rectangular" height={50} />
        </Stack>
    );
}

type IssueDetailViewProps = {
    issueKey: string;
}

const IssueDetailView = memo(({ issueKey }: IssueDetailViewProps) => {
    const {
        issue,
        error,
        update,
        createChild,
        changeStatus,
    } = useIssueDetail(issueKey);

    const [openForm, setOpenForm] = useState<"create" | "update" | null>(null);

    if (error || !issue) return null;

    return (
        <Stack spacing={2} sx={{ p: 3 }}>
            <Stack direction="row" alignItems="center" gap={1}>
                <Typography variant="caption" color="text.disabled">
                    Issues /
                </Typography>
                {issue.parent &&
                    <>
                        <Typography component={Link} to={{ search: `?${QUERY_PARAM.SELECTED_ISSUE}=${issue.parent.key}` }}>
                            {issue.parent.key}
                        </Typography>
                        <Typography variant="caption" color="text.disabled">/</Typography>
                    </>
                }
                <Chip label={issue.key} color="primary" size="small" />
            </Stack>
            <SelectableTextInput
                value={issue.title}
                onBlur={(value) => update({ title: value.trim() })}
                acceptOnEnter
                required
            />
            <Divider />
            <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={1.5}>
                <Stack direction="column" gap={0.5} flexWrap="wrap">
                    <Stack direction="row" width="100%" gap={1}>
                        <Typography variant="caption" color="text.secondary">Type</Typography>
                        <Stack direction="row" gap={0.3}>
                            <IssueTypeIcon issueType={issue.type} />
                            <Typography variant="caption" fontWeight="bold">{issue.type}</Typography>
                        </Stack>
                    </Stack>

                    <Stack direction="row" width="100%" gap={1}>
                        <Typography variant="caption" color="text.secondary">Priority</Typography>
                        <Stack direction="row" gap={0.3}>
                            <PriorityIcon priority={issue.priority} />
                            <Typography variant="caption" fontWeight="bold">
                                {issue.priority ? priorityToTextConverter(issue.priority) : "-"}
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
                <Button
                    variant="outlined"
                    size="small"
                    onClick={() => setOpenForm("update")}
                >
                    Edit
                </Button>
            </Stack>
            <Divider />
            <Grid container spacing={2}>
                <Grid size={7}>
                    <Stack direction="row" gap={1}>
                        {issue.dueDate &&
                            <MetaChip label="Due date" value={format(issue.dueDate, "yyyy-MM-dd")} color="primary" />
                        }
                        {issue.storyPoints &&
                            <MetaChip label="Story points" value={`${issue.storyPoints}`} color="warning" />
                        }
                    </Stack>
                    {(issue.dueDate || issue.storyPoints) && <Divider sx={{ mt: 1, mb: 1 }} />}
                    <Stack>
                        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>
                            Description
                        </Typography>
                        <SelectableTextInput
                            value={issue.description}
                            onBlur={(value) => update({ description: value.trim() })}
                            multiline
                            minRows={6}
                            maxRows={16}
                        />
                    </Stack>
                </Grid>
                <Grid size={5}>
                    <Paper variant="outlined" sx={{ borderRadius: "25px", p: 1.5 }}>
                        <StatusSelect
                            status={issue.status}
                            statuses={issue.project.statuses}
                            onChange={changeStatus}
                        />
                        <InfoBox label="Assigned">
                            <SelectableTextInput value={issue.assigned?.username} />
                        </InfoBox>
                        <InfoBox label="Reporter">
                            <SelectableTextInput value={issue.reporter?.username} />
                        </InfoBox>
                        <InfoBox label={`Created at (${issue.createdBy.username})`}>
                            <Typography variant="body2">
                                {format(issue.createdAt, "MMM d, yyyy · HH:mm")}
                            </Typography>
                        </InfoBox>
                        <Box sx={{ py: 1 }}>
                            <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>
                                {`Updated at (${issue.modifiedBy.username})`}
                            </Typography>
                            <Typography variant="body2">
                                {format(issue.updatedAt, "MMM d, yyyy · HH:mm")}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
            <Divider />
            {issue.linkedIssues?.length > 0 &&
                <>
                    <Paper variant="outlined" sx={{ borderRadius: "25px", p: 1.5 }}>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ mb: 1, display: "block", textTransform: "uppercase", letterSpacing: 1 }}
                        >
                            Linked issues
                        </Typography>
                        <Stack spacing={0.5}>
                            {issue.linkedIssues.map((linkedIssue) => (
                                <Stack
                                    key={linkedIssue.targetIssue.key}
                                    direction="row"
                                    alignItems="center"
                                    gap={1}
                                    sx={{ py: 0.5, borderBottom: "0.5px solid", borderColor: "divider" }}
                                >
                                    <Typography variant="caption" color="text.secondary">{linkedIssue.linkType}</Typography>
                                    <Typography variant="body2">{linkedIssue.targetIssue.key}</Typography>
                                </Stack>
                            ))}
                        </Stack>
                    </Paper>
                    <Divider />
                </>
            }
            {
                issue.type !== IssueType.SUBTASK &&
                <>
                    <Paper variant="outlined" sx={{ borderRadius: "25px", p: 1.5 }}>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ mb: 1, display: "block", textTransform: "uppercase", letterSpacing: 1 }}
                            >
                                Sub-issues
                            </Typography>
                            <IconButton size="small" onClick={() => setOpenForm("create")}>
                                <AddIcon fontSize="small" />
                            </IconButton>
                        </Stack>
                        <SubIssueList subIssues={issue.children} />
                    </Paper>
                    <Divider />
                </>
            }
            <Paper variant="outlined" sx={{ borderRadius: "25px", p: 1.5 }}>
                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mb: 1, display: "block", textTransform: "uppercase", letterSpacing: 1 }}
                >
                    Comments
                </Typography>
                <Box
                    sx={{
                        p: 3,
                        textAlign: "center",
                        bgcolor: "action.hover",
                        borderRadius: 1,
                        border: "1px dashed",
                        borderColor: "divider"
                    }}
                >
                    <Typography variant="body2" color="text.disabled">Comments will appear here</Typography>
                </Box>
            </Paper>
            <Dialog open={!!openForm} onClose={() => setOpenForm(null)}>
                {
                    openForm === "update"
                        ? (
                            <UpdateIssueForm
                                issue={issue}
                                onSave={(updateIssue) => {
                                    update(updateIssue);
                                    setOpenForm(null);
                                }}
                            />
                        )
                        : (
                            <CreateIssueForm
                                project={issue.project}
                                allowedTypes={issue.type === IssueType.EPIC
                                    ? [IssueType.STORY, IssueType.BUGFIX, IssueType.TASK]
                                    : [IssueType.SUBTASK]
                                }
                                onSave={(createdIssue) => {
                                    createChild(createdIssue);
                                    setOpenForm(null);
                                }}
                            />
                        )
                }
            </Dialog>
        </Stack>
    );
});

export default IssueDetailView;