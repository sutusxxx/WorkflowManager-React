import { DragDropProvider } from "@dnd-kit/react";
import { isSortable } from "@dnd-kit/react/sortable";
import { Stack } from "@mui/material";
import { useSortable } from '@dnd-kit/react/sortable';
import { Card } from '@mui/material';
import { useCallback, type ReactNode } from "react";

type Identifier = string | number;

type SortableItemProps = {
    id: Identifier,
    index: number,
    children: ReactNode,
};

function SortableItem({ id, index, children }: SortableItemProps) {
    const { ref } = useSortable({ id, index });

    return (
        <Card ref={ref} sx={{ padding: 1 }}>{children}</Card>
    );
}

export default function SortableList<T>({ items, onSort, getId, renderComponent }: {
    items: T[],
    onSort: (sortedItems: T[]) => void,
    getId: (item: T) => Identifier,
    renderComponent: (item: T) => ReactNode,
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
                {items.map((item, index) => {
                    const id = getId(item);
                    return (
                        <SortableItem key={id} id={id} index={index} >
                            {renderComponent(item)}
                        </SortableItem>
                    )
                })}
            </Stack>
        </DragDropProvider>
    );
}