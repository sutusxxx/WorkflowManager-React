import { MenuItem, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import Form from "../../../components/forms/Form";
import DateInput from "../../../components/inputs/DateInput";
import NumberInput from "../../../components/inputs/NumberInput";
import TextArea from "../../../components/inputs/TextArea";
import TextInput from "../../../components/inputs/TextInput";
import { Priority } from "../../../shared/enums/Priority";
import type { IssueDetail } from "../../../shared/types/issue-detail";
import type { UpdateIssue } from "../types/update-issue";

type IssueFormProps = {
    issue: IssueDetail;
    onSave: (issue: UpdateIssue) => void;
}

export default function IssueForm({ issue, onSave }: IssueFormProps) {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<UpdateIssue>({
        defaultValues: {
            title: issue.title,
            description: issue.description,
            storyPoints: issue.storyPoints,
            priority: issue.priority,
            dueDate: issue.dueDate,
        },
    });

    return (
        <Form
            title="Update issue"
            onSubmit={handleSubmit(onSave)}
            onReset={() => reset()}
        >
            <Controller
                name="title"
                control={control}
                render={({ field }) => (
                    <TextInput
                        label="title"
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.title}
                    />
                )}
            />

            <Controller
                name="description"
                control={control}
                render={({ field }) => (
                    <TextArea
                        label="description"
                        value={field.value}
                        onChange={field.onChange}
                        minRows={5}
                        maxRows={5}
                        error={errors.description}
                    />
                )}
            />

            <Controller
                name="storyPoints"
                control={control}
                render={({ field }) => (
                    <NumberInput
                        label="story points"
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.storyPoints}
                        min={0}
                        max={40}
                    />
                )}
            />

            <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        select
                        label="priority"
                        error={!!errors.priority}
                        helperText={errors.priority?.message}
                    >
                        {Object.values(Priority).map(priority => (
                            <MenuItem key={priority} value={priority}>
                                {priority}
                            </MenuItem>
                        ))}
                    </TextField>
                )}
            />

            <Controller
                name="dueDate"
                control={control}
                render={({ field }) => (
                    <DateInput
                        {...field}
                        label="due date"
                        error={errors.dueDate}
                    />
                )}
            />
        </Form>
    );
}