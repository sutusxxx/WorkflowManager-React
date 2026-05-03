import { TextField } from "@mui/material";
import type { ReactNode } from "react";
import type { FieldError } from "react-hook-form";

export type TextAreaProps = {
    label: ReactNode;
    value: string;
    minRows?: number;
    maxRows?: number;
    onChange?: (value: string) => void;
    error?: FieldError;
}

export default function TextArea({ label, value, minRows, maxRows, onChange, error }: TextAreaProps) {
    return (
        <TextField
            label={label}
            value={value}
            onChange={onChange ? (event) => onChange(event.target.value) : undefined}
            disabled={!onChange}
            error={!!error}
            helperText={error?.message}
            multiline
            minRows={minRows}
            maxRows={maxRows}
        />
    );
}