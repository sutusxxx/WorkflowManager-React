import { Link, Stack, Typography } from "@mui/material";
import SortableList from "~/components/lists/SortableList";
import { type Issue } from "~/interfaces/issue";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY, QUERY_PARAM } from "~/constants/queries.constant";
import { clientInstance } from "~/lib/api/client";
import SortableListSkeleton from "~/components/lists/SortableListSkeleton";
import { useMinDelay } from "~/hooks/useMinDelay";
import { useSearchParams } from "react-router";
import { memo } from "react";

type IssueListResponse = {
    issues: Issue[],
};

function IssueListItem({ item }: {
    item: Issue,
}) {
    const [_, setSearchParams] = useSearchParams();
    return (
        <Stack
            direction="row"
            sx={{
                justifyContent: "space-between",
            }}
        >
            <Typography
                variant="body2"
                component={Link}
                onClick={() => setSearchParams([[QUERY_PARAM.SELECTED_ISSUE, item.key]])}
                sx={{
                    cursor: "pointer",
                }}
            >
                {item.key} {item.title}
            </Typography>
            <Typography variant="body2">{item.status}</Typography>
        </Stack>
    );
}

const IssueList = memo(({ projectKey }: {
    projectKey: string,
}) => {
    const { data, isLoading, isError } = useQuery<IssueListResponse>({
        queryKey: [QUERY_KEY.ISSUES, projectKey],
        queryFn: async () => {
            const response = await clientInstance.get(`/projects/${projectKey}/issues`);

            return { issues: response.data ?? [] };
        },
    });

    const showSkeleton = useMinDelay(isLoading);

    if (showSkeleton) return <SortableListSkeleton />;
    if (isError) return <Typography variant="body2" color="error">Cannot fetch issues</Typography>;
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