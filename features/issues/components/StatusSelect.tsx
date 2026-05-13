import { useMemo } from "react";
import { StatusCategory, type Status } from "../../../shared/types/status";
import SelectInput from "../../../components/inputs/SelectInput";
import { Stack } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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
            label={<Stack direction="row">
                <span>Status</span>
                {status.category === StatusCategory.DONE ? <CheckCircleIcon fontSize="small" color="success" /> : null}
            </Stack>}
            value={status.id}
            onChange={onChange}
            options={options}
            sx={{
                width: 150,
            }}
        />
    )
}