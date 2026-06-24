import { Button } from "@mui/material";
import GridContainer from "../../components/layouts/GridContainer";
import GridItem from "../../components/layouts/GridItem";
import BacklogView from "../../features/issues/views/BacklogView";
import type { Route } from "./+types/project.backlog";
import { useState } from "react";
import CreateSprintForm from "../../features/issues/components/CreateSprintForm";
import Dialog from "../../components/misc/Dialog";
import { useMutation } from "@apollo/client/react";
import { CREATE_SPRINT } from "~/lib/query/graphql";
import type { CreateSprint } from "../../features/issues/types/create-sprint";

export default function Page({
  params,
}: Route.ComponentProps) {
  const [openCreateSprintDialog, setOpenCreateSprintDialog] = useState<boolean>(false);
  const [createSprint] = useMutation(CREATE_SPRINT);

  const handleSprintSave = (fields: CreateSprint) => {
    createSprint({ variables: { projectId: params.projectId, input: fields } });
  }

  return (
    <>
      <BacklogView projectId={params.projectId} />
      <Dialog fullWidth open={openCreateSprintDialog} onClose={() => setOpenCreateSprintDialog(false)}>
        <CreateSprintForm onSave={handleSprintSave} />
      </Dialog>
    </>
  );
}