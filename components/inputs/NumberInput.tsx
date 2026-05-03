import { TextField } from "@mui/material";
import type { FieldError } from "react-hook-form";

type NumberInputProps = {
    label: string;
    value: number;
    onChange?: (value: number) => void;
    min?: number;
    max?: number;
    error?: FieldError;
}

export default function NumberInput({label, value, onChange, min, max, error}: NumberInputProps) {
    return (
        <TextField
            label={label}
            value={value}
            disabled={!onChange}
            onChange={onChange ? (event) => onChange(Number(event.target.value)) : undefined}
            type="number"
            slotProps={{
                htmlInput: { min, max },
            }}
            error={!!error}
            helperText={error?.message}
        />
    )
}