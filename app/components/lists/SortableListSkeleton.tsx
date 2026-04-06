import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

export default function SortableListSkeleton() {
    return (
        <Stack>
            <Skeleton sx={{ padding: 1 }}/>
            <Skeleton sx={{ padding: 1 }}/>
            <Skeleton sx={{ padding: 1 }}/>
            <Skeleton sx={{ padding: 1 }}/>
            <Skeleton sx={{ padding: 1 }}/>
        </Stack>
    )
}