import { useState } from "react";
import SortableList from "~/components/lists/SortableList";

export default function IssueList() {
    const [items, setItems] = useState([1, 2, 3, 4, 5]);

    return <SortableList items={items} onSort={(sorted) => setItems(sorted)} getKey={(item) => item} />;
}