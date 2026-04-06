import { Typography } from "@mui/material";
import { useState } from "react";
import SortableList from "~/components/lists/SortableList";
import { IssueType } from "./IssueType";
import { Priority } from "./Priority";

const TEST_DATA = [
    { key: "DEV-1", title: "This is the first EPIC", type: IssueType.EPIC, priority: Priority.HIGH },
    { key: "DEV-2", title: "Impelement something", type: IssueType.STORY, priority: Priority.BLOCKER },
    { key: "DEV-3", title: "Fix something", type: IssueType.BUGFIX, priority: Priority.MINOR },
    { key: "DEV-4", title: "Add something", type: IssueType.TASK, priority: Priority.MEDIUM },
]

function IssueListItem({ item }: {
    item: any,
}) {
    return (
        <Typography>{item.key} - {item.title}</Typography>
    )
}

export default function IssueList() {
    const [items, setItems] = useState(TEST_DATA);

    return (
        <SortableList
            items={items}
            onSort={(sorted) => setItems(sorted)}
            getId={(item) => item.key}
            renderComponent={(item) => (
                <IssueListItem item={item} />
            )}
        />
    );
}