import { Controller, useForm } from "react-hook-form";
import type { Sprint } from "../../../shared/types/sprint";
import Form from "../../../components/forms/Form";
import TextInput from "../../../components/inputs/TextInput";
import TextArea from "../../../components/inputs/TextArea";

type EditSprintFormProps = {
  sprint: Sprint;
  onSave: (sprint: Sprint) => void;
}

export default function EditSprintForm({ sprint, onSave }: EditSprintFormProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: sprint,
  });

  return (
    <Form
      title="Edit Sprint"
      onSubmit={handleSubmit(onSave)}
      onReset={reset}
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
    </Form>
  )
}