import { useMemo } from "react";
import type { Status } from "../../../shared/types/status";
import SelectInput from "../../../components/inputs/SelectInput";

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
        <SelectInput
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