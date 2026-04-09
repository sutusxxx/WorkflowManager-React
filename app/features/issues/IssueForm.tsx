import { Box, Button, Chip, Divider, Grid, Paper, Skeleton, Stack, TextField, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query"
import MetaChip from "~/components/misc/MetaChip";
import { QUERY_KEY, QUERY_PARAM } from "~/constants/queries.constant"
import { useMinDelay } from "~/hooks/useMinDelay";
import type { IssueDetail } from "~/interfaces/issue-detail";
import { clientInstance } from "~/lib/api/client";
import { format } from "date-fns";
import InfoBox from "~/components/misc/InfoBox";
import EditIcon from "@mui/icons-material/Edit";
import Link from "~/components/navigation/Link";
import { memo } from "react";

type IssueDetailResponse = {
    issue: IssueDetail;
};

function IssueFormSkeleton() {
    return (
        <Stack spacing={2} sx={{ p: 3 }}>
            <Stack direction="row" alignItems="center" gap={1}>
                <Skeleton width={100} height={30} />
            </Stack>
            <Skeleton width={280} height={60} />
            <Divider />
            <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={1.5}>
                <Skeleton width={200} height={40} />
                <Skeleton width={100} height={40} />
            </Stack>
            <Divider />
            <Grid container spacing={2}>
                <Skeleton variant="rectangular" width={180} height={160} />
                <Skeleton variant="rectangular" width={180} height={160} />
            </Grid>
            <Divider />
            <Skeleton variant="rectangular" height={100} />
            <Skeleton variant="rectangular" height={50} />
        </Stack>
    )
}

const IssueForm = memo(({ issueKey }: {
    issueKey: string;
}) => {
    const { data, isLoading, isError } = useQuery<IssueDetailResponse>({
        queryKey: [QUERY_KEY.ISSUES, issueKey],
        queryFn: async () => {
            const response = await clientInstance.get(`/issues/${issueKey}`);

            return { issue: response.data };
        }
    });

    const showSkeleton = useMinDelay(isLoading);

    if (showSkeleton) return <IssueFormSkeleton />;
    if (isError) return <Typography variant="body2" color="error">Cannot fetch issue with key: {issueKey}</Typography>;
    if (!data?.issue) return null;

    const issue = data.issue;

    return (
        <Stack spacing={2} sx={{ p: 3 }}>
            <Stack direction="row" alignItems="center" gap={1}>
                <Typography variant="caption" color="text.disabled">
                    Issues /
                </Typography>
                {issue.parentKey &&
                    <Link to={{ search: `?${QUERY_PARAM.SELECTED_ISSUE}=${issue.parentKey}` }}>
                        {issue.parentKey}
                    </Link>}
                <Chip label={issue.key} color="primary" size="small" />
            </Stack>
            <TextField
                fullWidth
                variant="standard"
                defaultValue={issue.title}
                onBlur={(e) => null}
                InputProps={{ disableUnderline: true, sx: { fontSize: 20, fontWeight: 500 } }}
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
                    startIcon={<EditIcon fontSize="small" />}
                >
                    Edit
                </Button>
            </Stack>
            <Divider />
            <Grid container spacing={2}>
                <Grid>
                    <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>
                        Description
                    </Typography>
                    <TextField
                        fullWidth
                        multiline
                        minRows={6}
                        defaultValue={issue.description}
                        onBlur={(e) => null}
                    />
                </Grid>
                <Grid>
                    <Paper variant="outlined" sx={{ borderRadius: 2, p: 1.5 }}>
                        <InfoBox label="Status">
                            <Chip label={issue.status} color="primary" size="small" />
                        </InfoBox>
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
            {issue.linkedIssue?.size > 0 &&
                <Stack spacing={2}>
                    <Paper variant="outlined" sx={{ borderRadius: 2, p: 1.5 }}>
                        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: "block", textTransform: "uppercase", letterSpacing: 1 }}>
                            Linked issues
                        </Typography>
                        <Stack spacing={0.5}>
                            {Array.from(issue.linkedIssue.entries()).map(([key, relation]) => (
                                <Stack key={key} direction="row" alignItems="center" gap={1} sx={{ py: 0.5, borderBottom: "0.5px solid", borderColor: "divider" }}>
                                    <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "primary.main", flexShrink: 0 }} />
                                    <Typography variant="caption" color="text.secondary">{relation}</Typography>
                                    <Typography variant="body2">{key}</Typography>
                                </Stack>
                            ))}
                        </Stack>
                    </Paper>
                </Stack>
            }
            {issue.subIssues?.length > 0 &&
                <>
                    <Stack>
                        <Paper variant="outlined" sx={{ borderRadius: 2, p: 1.5 }}>
                            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: "block", textTransform: "uppercase", letterSpacing: 1 }}>
                                Sub-issues
                            </Typography>
                            <Stack spacing={0.5}>
                                {issue.subIssues.map((sub) => (
                                    <Stack key={sub.key} direction="row" alignItems="center" gap={1} sx={{ py: 0.5, borderBottom: "0.5px solid", borderColor: "divider" }}>
                                        <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "success.main", flexShrink: 0 }} />
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