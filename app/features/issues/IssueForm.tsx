import { Box, Button, Chip, Divider, Grid, Paper, Skeleton, Stack, Typography } from "@mui/material";
import MetaChip from "~/components/misc/MetaChip";
import { QUERY_PARAM } from "~/constants/queries.constant"
import { useMinDelay } from "~/hooks/useMinDelay";
import { format } from "date-fns";
import InfoBox from "~/components/misc/InfoBox";
import EditIcon from "@mui/icons-material/Edit";
import Link from "~/components/navigation/Link";
import { memo } from "react";
import Select from "~/components/inputs/Select";
import { useIssueDetail } from "~/hooks/useIssueDetail";
import { SelectableTextField } from "~/components/inputs/SelectableTextField";

function IssueFormSkeleton() {
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

const IssueForm = memo(({ issueKey }: {
    issueKey: string;
}) => {
    const {
        issue,
        loading,
        error,
        handleUpdate,
        handleStatusChange,
    } = useIssueDetail(issueKey);

    const showSkeleton = useMinDelay(loading);
    if (showSkeleton) return <IssueFormSkeleton />;
    if (error) return <Typography variant="body2" color="error">Cannot fetch issue</Typography>;
    if (!issue) return null;

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
            <SelectableTextField value={issue.title} onBlur={(value) => handleUpdate({ title: value.trim() })} />
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
                    startIcon={<EditIcon fontSize="small" />}
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
                    <Stack
                        sx={{
                            height: "100%",
                            justifyContent: "space-between",
                            paddingBottom: 2,
                        }}
                    >
                        <SelectableTextField
                            value={issue.description}
                            onBlur={(value) => handleUpdate({ description: value.trim() })}
                            multiline
                            minRows={6}
                            maxRows={16}
                        />
                    </Stack>
                </Grid>
                <Grid size={5}>
                    <Paper variant="outlined" sx={{ borderRadius: 2, p: 1.5 }}>
                        <Select
                            label="Status"
                            value={issue.status.id}
                            onChange={handleStatusChange}
                            options={issue.project.statuses.map(status => ({ label: status.name, value: status.id }))}
                            sx={{
                                width: 150,
                            }}
                        />
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
            {issue.children?.length > 0 &&
                <>
                    <Stack>
                        <Paper variant="outlined" sx={{ borderRadius: 2, p: 1.5 }}>
                            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: "block", textTransform: "uppercase", letterSpacing: 1 }}>
                                Sub-issues
                            </Typography>
                            <Stack spacing={0.5}>
                                {issue.children.map((sub) => (
                                    <Stack key={sub.key} direction="row" alignItems="center" gap={1} sx={{ py: 0.5, borderBottom: "0.5px solid", borderColor: "divider" }}>
                                        <Link to={{ search: `?${QUERY_PARAM.SELECTED_ISSUE}=${sub.key}` }}>{sub.key}</Link>
                                        <Typography variant="body2">{sub.title}</Typography>
                                    </Stack>
                                ))}
                            </Stack>
                        </Paper>
                    </Stack>
                    <Divider />
                </>
            }
            <Paper variant="outlined" sx={{ borderRadius: 2, p: 1.5 }}>
                <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: "block", textTransform: "uppercase", letterSpacing: 1 }}>
                    Comments
                </Typography>
                <Box sx={{ p: 3, textAlign: "center", bgcolor: "action.hover", borderRadius: 1, border: "1px dashed", borderColor: "divider" }}>
                    <Typography variant="body2" color="text.disabled">Comments will appear here</Typography>
                </Box>
            </Paper>
        </Stack>
    );
});

export default IssueForm;