import { Controller, useForm } from "react-hook-form";
import Form from "../../../components/forms/Form";
import DateInput from "../../../components/inputs/DateInput";
import NumberInput from "../../../components/inputs/NumberInput";
import SelectInput from "../../../components/inputs/SelectInput";
import TextArea from "../../../components/inputs/TextArea";
import TextInput from "../../../components/inputs/TextInput";
import { Priority } from "../../../shared/enums/Priority";
import type { IssueDetail } from "../../../shared/types/issue-detail";
import { priorityToTextConverter } from "../../../shared/helpers/converters";
import GridContainer from "../../../components/layouts/GridContainer";
import GridItem from "../../../components/layouts/GridItem";
import { Box } from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { UpdateIssue } from "../types/update-issue";

const updateIssueSchema = z.object({
    title: z.string().min(1, "title is required").max(200, "title is too long"),
    description: z.string().max(5000, "description is too long").optional(),
    storyPoints: z
        .number()
        .min(0, "story points must be at least 0")
        .max(40, "story points must be at most 40")
        .optional(),
    priority: z.enum(Priority),
    dueDate: z.date().optional(),
});

type UpdateIssueFormData = z.infer<typeof updateIssueSchema>;

type UpdateIssueFormProps = {
    issue: IssueDetail;
    onSave: (issue: UpdateIssue) => void;
};

export default function UpdateIssueForm({ issue, onSave }: UpdateIssueFormProps) {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<UpdateIssueFormData>({
        defaultValues: {
            title: issue.title,
            description: issue.description,
            storyPoints: issue.storyPoints,
            priority: issue.priority,
            dueDate: issue.dueDate,
        },
        resolver: zodResolver(updateIssueSchema),
    });

    return (
        <Box
            sx={{
                maxWidth: "400px"
            }}
        >
            <Form
                title="Update issue"
                onSubmit={handleSubmit(onSave)}
                onReset={() => reset()}
            >
                <GridContainer columns={1}>
                    <GridItem>
                        <TextInput label="project" value={issue.project.name} />
                    </GridItem>
                    <GridItem>
                        <TextInput label="type" value={issue.type} />
                    </GridItem>
                    <GridItem>
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
                    </GridItem>
                    <GridItem>
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <TextArea
                                    label="description"
                                    value={field.value ?? ""}
                                    onChange={field.onChange}
                                    minRows={5}
                                    maxRows={5}
                                    error={errors.description}
                                />
                            )}
                        />
                    </GridItem>
                    <GridItem>
                        <Controller
                            name="storyPoints"
                            control={control}
                            render={({ field }) => (
                                <NumberInput
                                    label="story points"
                                    value={field.value ?? null}
                                    onChange={field.onChange}
                                    error={errors.storyPoints}
                                    min={0}
                                    max={40}
                                />
                            )}
                        />
                    </GridItem>
                    <GridItem>
                        <Controller
                            name="priority"
                            control={control}
                            render={({ field }) => (
                                <SelectInput
                                    label="priority"
                                    value={field.value}
                                    onChange={field.onChange}
                                    options={Object.values(Priority).map(priority => ({
                                        label: priorityToTextConverter(priority),
                                        value: priority,
                                    }))}
                                    error={errors.priority}
                                />
                            )}
                        />
                    </GridItem>
                    <GridItem>
                        <Controller
                            name="dueDate"
                            control={control}
                            render={({ field }) => (
                                <DateInput
                                    {...field}
                                    value={field.value ?? null}
                                    label="due date"
                                    error={errors.dueDate}
                                />
                            )}
                        />
                    </GridItem>
                </GridContainer>
            </Form>
        </Box>
    );
}