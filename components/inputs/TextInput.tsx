import { TextField } from "@mui/material";
import type { ReactNode } from "react";
import type { FieldError } from "react-hook-form";

export type TextInputProps = {
    label: ReactNode;
    value: string;
    onChange?: (value: string) => void;
    error?: FieldError;
}

export default function TextInput({ label, value, onChange, error }: TextInputProps) {
    return (
        <TextField
            label={label}
            value={value}
            onChange={onChange ?  (event) => onChange(event.target.value) : undefined}
            disabled={!onChange}
            error={!!error}
            helperText={error?.message}
        />
    );
}