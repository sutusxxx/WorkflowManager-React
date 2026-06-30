import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import type { ReactNode } from "react";
import type { FieldError } from "react-hook-form";

export type DateInputProps = {
    label: ReactNode;
    value: Date | null;
    onChange?: (value: Date | null) => void;
    error?: FieldError;
    size?: number;
}

export default function DateInput({ label, value, onChange, error, size }: DateInputProps) {
    return (
        <DatePicker
            label={label}
            value={value ? dayjs(value) : null}
            onChange={onChange ? (value) => value && onChange(value.toDate()) : undefined}
            disabled={!onChange}
            format="YYYY-MM-DD"
            slotProps={{
                field: { clearable: true, onClear: () => onChange?.(null) },
                textField: {
                    fullWidth: true,
                    variant: "standard",
                    slotProps: {
                        inputLabel: { shrink: true }
                    },
                    error: !!error,
                    helperText: error?.message,
                    size: "small",
                },
            }}
            sx={{
                width: size + "rem",
            }}
        />
    );
}