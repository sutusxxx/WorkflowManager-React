import { FormControl, InputLabel, MenuItem, Select as MuiSelect, type SxProps, type Theme } from "@mui/material";
import type { ReactNode } from "react";

export type SelectOption<T> = {
    label: string;
    value: T;
}

export type SelectProps<T> = {
    label: ReactNode;
    value: T;
    onChange?: (value: T) => void;
    options: SelectOption<T>[];
    sx?: SxProps<Theme>;
}

export default function SelectInput<T extends string | number>({ label, value, onChange, options, sx }: SelectProps<T>) {
    return (
        <FormControl variant="standard" sx={sx} disabled={!onChange}>
            <InputLabel shrink>{label}</InputLabel>
            <MuiSelect
                size="small"
                value={value}
                onChange={onChange ? (event) => onChange(event.target.value as T) : undefined}
                MenuProps={{ disablePortal: true }}
            >
                {options.map(option =>
                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                )}
            </MuiSelect>
        </FormControl>
    );
}