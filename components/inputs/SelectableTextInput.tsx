import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useRef, useState } from "react";

export type SelectableTextInputProps = {
    value: string;
    onBlur?: (value: string) => void;
    acceptOnEnter?: boolean;
    multiline?: boolean;
    minRows?: number;
    maxRows?: number;
    required?: boolean;
}

export function SelectableTextInput({ value, onBlur, acceptOnEnter, multiline, minRows, maxRows, required }: SelectableTextInputProps) {
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleBlur = (value: string) => {
        if (!required || value) {
            onBlur?.(value);
        };
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
                    if (e.key === "Enter" && acceptOnEnter) handleBlur(inputRef.current?.value!);
                }}
                autoFocus={isEditMode}
                multiline={multiline}
                minRows={minRows}
                maxRows={maxRows}
                required={required}
                sx={{
                    backgroundColor: "rgb(242, 242, 242)",
                    borderRadius: "5px",
                }}
            />
        )
        : (
            <Typography
                onClick={handleFieldSelect}
                sx={{
                    height: minRows + "rem",
                    whiteSpace: "pre-wrap",
                    cursor: "text",
                    minWidth: 100,
                }}
            >
                {value ?? ""}
            </Typography>
        )
}
