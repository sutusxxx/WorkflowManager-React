import { Box, Button, Chip, Dialog, DialogContent, Divider, Grid, IconButton, Paper, Skeleton, Stack, Typography } from "@mui/material";
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
        handleUpdate,
        handleStatusChange,
    } = useIssueDetail(issueKey);

    const [openForm, setOpenForm] = useState<"create" | "update" | null>(null);

    if (error || !issue) {
        return null;
    }

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
                onBlur={(value) => handleUpdate({ title: value.trim() })}
                acceptOnEnter
                required
            />
            <Divider />
            <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={1.5}>
                <Stack direction="row" alignItems="center" gap={2} flexWrap="wrap">
                    <MetaChip label="Type" value={issue.type} color="primary" />
                    {issue.storyPoints != null && <MetaChip label="Story points" value={`${issue.storyPoints}`} color="secondary" />}
                    {issue.dueDate && <MetaChip label="Due" value={format(issue.dueDate, "MMM d, yyyy")} color="warning" />}
                    {issue.priority && <MetaChip label="Priority" value={issue.priority} color="success" />}
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
                    <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>
                        Description
                    </Typography>
                    <SelectableTextInput
                        value={issue.description}
                        onBlur={(value) => handleUpdate({ description: value.trim() })}
                        multiline
                        minRows={6}
                        maxRows={16}
                    />
                </Grid>
                <Grid size={5}>
                    <Paper variant="outlined" sx={{ borderRadius: 2, p: 1.5 }}>
                        <StatusSelect status={issue.status} statuses={issue.project.statuses} onChange={handleStatusChange} />
                        <InfoBox label="Created at">
                            <Typography variant="body2">
                                {format(issue.createdAt, "MMM d, yyyy · HH:mm")}
                            </Typography>
                        </InfoBox>
                        <Box sx={{ py: 1 }}>
                            <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>
                                Updated at
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
                <Stack spacing={2}>
                    <Paper variant="outlined" sx={{ borderRadius: 2, p: 1.5 }}>
                        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: "block", textTransform: "uppercase", letterSpacing: 1 }}>
                            Linked issues
                        </Typography>
                        <Stack spacing={0.5}>
                            {issue.linkedIssues.map((linkedIssue) => (
                                <Stack key={linkedIssue.targetIssue.key} direction="row" alignItems="center" gap={1} sx={{ py: 0.5, borderBottom: "0.5px solid", borderColor: "divider" }}>
                                    <Typography variant="caption" color="text.secondary">{linkedIssue.linkType}</Typography>
                                    <Typography variant="body2">{linkedIssue.targetIssue.key}</Typography>
                                </Stack>
                            ))}
                        </Stack>
                    </Paper>
                </Stack>
            }
            <Stack>
                <Paper variant="outlined" sx={{ borderRadius: 2, p: 1.5 }}>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: "block", textTransform: "uppercase", letterSpacing: 1 }}>
                            Sub-issues
                        </Typography>
                        {issue.type !== IssueType.SUBTASK &&
                            <IconButton size="small" onClick={() => setOpenForm("create")}>
                                <AddIcon fontSize="small" />
                            </IconButton>
                        }
                    </Stack>
                    <Stack spacing={0.5}>
                        {issue.children?.map((sub) => (
                            <Stack key={sub.key} direction="row" alignItems="center" gap={1} sx={{ py: 0.5, borderBottom: "0.5px solid", borderColor: "divider" }}>
                                <Link to={{ search: `?${QUERY_PARAM.SELECTED_ISSUE}=${sub.key}` }}>{sub.key}</Link>
                                <Typography variant="body2">{sub.title}</Typography>
                            </Stack>
                        ))}
                    </Stack>
                </Paper>
            </Stack>
            <Divider />
            <Paper variant="outlined" sx={{ borderRadius: 2, p: 1.5 }}>
                <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: "block", textTransform: "uppercase", letterSpacing: 1 }}>
                    Comments
                </Typography>
                <Box sx={{ p: 3, textAlign: "center", bgcolor: "action.hover", borderRadius: 1, border: "1px dashed", borderColor: "divider" }}>
                    <Typography variant="body2" color="text.disabled">Comments will appear here</Typography>
                </Box>
            </Paper>
            <Dialog open={!!openForm} onClose={() => setOpenForm(null)}>
                <DialogContent>
                    {
                        openForm === "update"
                            ? (
                                <UpdateIssueForm
                                    issue={issue}
                                    onSave={(updateIssue) => {
                                        console.log(updateIssue);
                                        handleUpdate(updateIssue);
                                        setOpenForm(null);
                                    }}
                                />
                            )
                            : (
                                <CreateIssueForm
                                    parentIssue={issue}
                                    onSave={(createdIssue) => {
                                        console.log(createdIssue);
                                    }}
                                />
                            )
                    }
                </DialogContent>
            </Dialog>
        </Stack>
    );
});

export default IssueDetailView;