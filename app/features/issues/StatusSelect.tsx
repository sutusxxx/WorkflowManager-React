import { useMemo } from "react";
import Select from "~/components/inputs/Select";
import type { Status } from "~/interfaces/status";

type StatusSelectProps = {
    status: Status;
    onChange: (value: string) => void;
    statuses: Status[];
}

export default function StatusSelect({ status, onChange, statuses }: StatusSelectProps) {
    const options = useMemo(() => {
        return statuses
            .filter(projectStatus => status.allowedTransitionIds.includes(projectStatus.id) || status.id === projectStatus.id)
            .map(allowedStatus => ({ label: allowedStatus.name, value: allowedStatus.id }));
    }, [statuses, status]);

    return (
        <Select
            label="Status"
            value={status.id}
            onChange={onChange}
            options={options}
            sx={{
                width: 150,
            }}
        />
    )
}