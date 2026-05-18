import { Controller, useForm } from "react-hook-form";
import Form from "../../../components/forms/Form";
import DateInput from "../../../components/inputs/DateInput";
import NumberInput from "../../../components/inputs/NumberInput";
import SelectInput from "../../../components/inputs/SelectInput";
import TextArea from "../../../components/inputs/TextArea";
import TextInput from "../../../components/inputs/TextInput";
import { Priority } from "../../../shared/enums/Priority";
import type { IssueDetail } from "../../../shared/types/issue-detail";
import type { UpdateIssue } from "../types/update-issue";
import { priorityToTextConverter } from "../../../shared/helpers/converters";
import GridContainer from "../../../components/layouts/GridContainer";
import GridItem from "../../../components/layouts/GridItem";

type UpdateIssueFormProps = {
    issue: IssueDetail;
    onSave: (issue: UpdateIssue) => void;
}

export default function UpdateIssueForm({ issue, onSave }: UpdateIssueFormProps) {
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
            <GridContainer columns={2}>
                <GridItem>
                    <TextInput label="project" value={issue.project.name} />
                </GridItem>
                <GridItem>
                    <TextInput label="type" value={issue.type} />
                </GridItem>
                <GridItem size={2}>
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
                <GridItem size={2}>
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
                </GridItem>
                <GridItem>
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
                                label="due date"
                                error={errors.dueDate}
                            />
                        )}
                    />
                </GridItem>
            </GridContainer>
        </Form>
    );
}