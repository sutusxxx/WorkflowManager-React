import { Button, Stack, Typography } from "@mui/material";
import LoadingIndicator from "../../../components/misc/LoadingIndicator";
import ProjectList from "../components/ProjectList";
import { useProjectList } from "../hooks/useProjectList";

export default function ProjectListView() {
    const { data, loading, error, loadMore, onProjectSelect } = useProjectList();

    if (loading) return <LoadingIndicator />;
    if (error) return <Typography variant="body2" color="error">Cannot fetch projects</Typography>
    if (!data!.edges?.length) return <Typography variant="body2">Not Found</Typography>

    return (
        <Stack>
            <ProjectList
                projects={data!.edges.map(edge => edge.node)}
                onClick={onProjectSelect}
            />
            {data!.pageInfo.hasNextPage &&
                <Button onClick={loadMore} size="small">Load more</Button>
            }
        </Stack>
    );
}
