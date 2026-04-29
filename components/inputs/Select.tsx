import { FormControl, InputLabel, MenuItem, Select as MuiSelect, type SelectChangeEvent, type SxProps, type Theme } from "@mui/material";
import { useState } from "react";

export type SelectOption<T> = {
    label: string;
    value: T;
}

export type SelectProps<T> = {
    label: string;
    value: T;
    onChange?: (value: T) => void;
    options: SelectOption<T>[];
    sx?: SxProps<Theme>;
}

export default function Select<T extends string | number>({ label, value, onChange, options, sx }: SelectProps<T>) {
    return (
        <FormControl variant="standard" sx={sx} disabled={!onChange}>
            <InputLabel>{label}</InputLabel>
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