import { Box, Button, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, Typography } from "@mui/material";
import type { Issue } from "../../../shared/types/issue";
import type { Sprint } from "../../../shared/types/sprint"
import { useMutation } from "@apollo/client/react";
import { MOVE_TO_SPRINT } from "~/lib/query/graphql";
import { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import { SprintState } from "../../../shared/enums/SprintState";

type MoveToSprintProps = {
  sprints: Sprint[];
  issue: Issue;
}

export default function MoveToSprint({ sprints, issue }: MoveToSprintProps) {
  const [moveToSprint] = useMutation(MOVE_TO_SPRINT);
  const [selected, setSelected] = useState<string | null>(null);

  const handleMoveToSprint = () => {
    moveToSprint({ variables: { sprintId: selected, input: { issueId: issue.id } } })
  };

  if (!sprints.length) return <Typography>Hoppáá no Sprint!</Typography>

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
      }}
    >
      <FormControl component="fieldset" fullWidth>
        <FormLabel component="legend" sx={{ mb: 1, fontWeight: 600 }}>
          Choose a sprint
        </FormLabel>
        <RadioGroup
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          {sprints.map((sprint) => (
            <FormControlLabel
              key={sprint.id}
              value={sprint.id}
              control={<Radio />}
              label={sprint.name + (sprint.state === SprintState.ACTIVE ? " 🟢" : "")}
            />
          ))}
        </RadioGroup>
      </FormControl>

      <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          size="small"
          startIcon={<SaveIcon />}
          disabled={!selected}
          onClick={!!selected ? handleMoveToSprint : undefined}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}