import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useRef, useState } from "react";

export type SelectableTextFieldProps = {
    value: string;
    onBlur?: (value: string) => void;
    multiline?: boolean;
    minRows?: number;
    maxRows?: number;
}

export function SelectableTextField({ value, onBlur, multiline, minRows, maxRows }: SelectableTextFieldProps) {
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleBlur = (value: string) => {
        onBlur?.(value);
        setIsEditMode(false);
    };

    const handleFieldSelect = () => {
        setIsEditMode(true);
    };

    return isEditMode
        ? (
            <TextField
                inputRef={inputRef}
                fullWidth
                size="small"
                variant="standard"
                defaultValue={value} // uncontrolled
                onBlur={(event) => handleBlur(event.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") handleBlur(inputRef.current?.value!);
                }}
                autoFocus={isEditMode}
                multiline={multiline}
                minRows={minRows}
                maxRows={maxRows}
            />
        )
        : <Typography onClick={handleFieldSelect}>{value}</Typography>
}
