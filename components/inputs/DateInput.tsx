import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import type { ReactNode } from "react";
import type { FieldError } from "react-hook-form";

export type DateInputProps = {
    label: ReactNode;
    value: Date;
    onChange?: (value: Date) => void;
    error?: FieldError;
}

export default function DateInput({label, value, onChange, error}: DateInputProps) {
    return (
        <DatePicker
            label={label}
            value={value ? dayjs(value) : null}
            onChange={onChange ? (value) => value && onChange(value.toDate()) : undefined}
            disabled={!onChange}
            slotProps={{
                textField: {
                    fullWidth: true,
                    variant: "standard",
                    slotProps: {
                        inputLabel: { shrink: true }
                    },
                    error: !!error,
                    helperText: error?.message,
                },
            }}
        />
    )
}