import BacklogView from "../../features/issues/views/BacklogView";
import type { Route } from "./+types/project.backlog";
import { useState } from "react";
import CreateSprintForm from "../../features/issues/components/CreateSprintForm";
import Dialog from "../../components/misc/Dialog";
import { useMutation } from "@apollo/client/react";
import { CREATE_SPRINT } from "~/lib/query/graphql";
import type { CreateSprint } from "../../features/issues/types/create-sprint";
import { useSelectedIssue } from "../../features/issues/hooks/useSelectedIssue";

export default function Page({
  params,
}: Route.ComponentProps) {
  const [openCreateSprintDialog, setOpenCreateSprintDialog] = useState<boolean>(false);
  const [createSprint] = useMutation(CREATE_SPRINT);
  const { dialog, selectIssue } = useSelectedIssue();

  const handleSprintSave = (fields: CreateSprint) => {
    createSprint({ variables: { projectId: params.projectId, input: fields } });
  }

  return (
    <>
      <BacklogView projectId={params.projectId} onIssueSelect={selectIssue} />
      <Dialog fullWidth open={openCreateSprintDialog} onClose={() => setOpenCreateSprintDialog(false)}>
        <CreateSprintForm onSave={handleSprintSave} />
      </Dialog>
      {dialog}
    </>
  );
}