import { Controller, useForm } from "react-hook-form";
import Form from "../../../components/forms/Form";
import DateInput from "../../../components/inputs/DateInput";
import NumberInput from "../../../components/inputs/NumberInput";
import SelectInput from "../../../components/inputs/SelectInput";
import TextArea from "../../../components/inputs/TextArea";
import TextInput from "../../../components/inputs/TextInput";
import { IssueType } from "../../../shared/enums/IssueType";
import { Priority } from "../../../shared/enums/Priority";
import type { CreateIssue } from "../types/create-issue";
import { Stack } from "@mui/material";
import type { Project } from "../../../shared/types/project";

type CreateIssueFormProps = {
    project: Project;
    allowedTypes: IssueType[];
    onSave: (issue: CreateIssue) => void;
}

export default function CreateIssueForm({ project, allowedTypes, onSave }: CreateIssueFormProps) {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreateIssue>({
        defaultValues: {
            projectId: project.id,
            priority: Priority.LOW,
            type: allowedTypes.length > 0 ? allowedTypes[0] : undefined,
        },
    });

    return (
        <Form
            title="Create issue"
            onSubmit={handleSubmit(onSave)}
            onReset={() => reset()}
        >
            <TextInput label="project" value={project.name} />

            <Controller
                name="title"
                control={control}
                rules={{ required: "title is required" }}
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
                name="type"
                control={control}
                rules={{ required: "type is required" }}
                render={({ field }) => (
                    <SelectInput
                        label="type"
                        value={field.value}
                        onChange={field.onChange}
                        options={allowedTypes.map(type => ({
                            label: type.toLowerCase(),
                            value: type,
                        }))}
                        error={errors.type}
                    />
                )}
            />


            <Stack direction="row" spacing={1}>
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
                        <SelectInput
                            label="priority"
                            value={field.value}
                            onChange={field.onChange}
                            options={Object.values(Priority).map(priority => ({
                                label: priority.toLowerCase(),
                                value: priority,
                            }))}
                            error={errors.priority}
                        />
                    )}
                />
            </Stack>

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