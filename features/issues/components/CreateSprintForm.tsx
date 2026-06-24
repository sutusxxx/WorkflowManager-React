import { Controller, useForm } from "react-hook-form";
import TextArea from "../../../components/inputs/TextArea";
import TextInput from "../../../components/inputs/TextInput";
import Form from "../../../components/forms/Form";
import type { CreateSprint } from "../types/create-sprint";
import DateInput from "../../../components/inputs/DateInput";

type CreateSprintFormProps = {
  onSave: (sprint: CreateSprint) => void;
}

export default function CreateSprintForm({ onSave }: CreateSprintFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateSprint>();

  return (
    <Form
      title="Edit Sprint"
      onSubmit={handleSubmit(onSave)}
    >
      <Controller
        name="name"
        control={control}
        rules={{ required: "name is required" }}
        render={({ field }) => (
          <TextInput
            label="name"
            value={field.value}
            onChange={field.onChange}
            error={errors.name}
          />
        )}
      />
      <Controller
        name="goal"
        control={control}
        render={({ field }) => (
          <TextArea
            label="goal"
            value={field.value}
            onChange={field.onChange}
            minRows={4}
            maxRows={4}
            error={errors.goal}
          />
        )}
      />
      <Controller
        name="startDate"
        control={control}
        render={({ field }) => (
          <DateInput
            label="start date"
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <Controller
        name="endDate"
        control={control}
        render={({ field }) => (
          <DateInput
            label="end date"
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
    </Form>
  );
}