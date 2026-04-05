import { DragDropProvider } from "@dnd-kit/react";
import { isSortable } from "@dnd-kit/react/sortable";
import { Stack } from "@mui/material";
import { useSortable } from '@dnd-kit/react/sortable';
import { Card } from '@mui/material';
import { useCallback } from "react";


function SortableItem<T_ID extends (string | number)>({ id, index }: {
    id: T_ID,
    index: number,
}) {
    const { ref } = useSortable({ id, index });

    return (
        <Card ref={ref} sx={{ padding: 1}}>Item {id}</Card>
    );
}

export default function SortableList<T, T_ID extends (string | number)>({ items, onSort, getKey }: {
    items: T[],
    onSort: (sortedItems: T[]) => void,
    getKey: (item: T) => T_ID,
}) {
    const sortItems = useCallback((index: number, initialIndex: number) => {
        const newItems = [...items];
        const [removed] = newItems.splice(initialIndex, 1);
        newItems.splice(index, 0, removed);
        return newItems;
    }, [items]);

    return (
        <DragDropProvider
            onDragEnd={(event) => {
                if (event.canceled) return;

                const { source } = event.operation;

                if (isSortable(source)) {
                    const { initialIndex, index } = source;

                    if (initialIndex !== index) {
                        onSort(sortItems(index, initialIndex));
                    }
                }
            }}
        >
            <Stack spacing={1}>
                {items.map((item, index) =>
                    <SortableItem key={getKey(item)} id={getKey(item)} index={index} />
                )}
            </Stack>
        </DragDropProvider>
    );
}