import { Stack, Typography, IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import type { Sprint } from "../../../shared/types/sprint";
import Menu from "../../../components/navigation/Menu";
import { useMutation } from "@apollo/client/react";
import { ACTIVATE_SPRINT } from "~/lib/query/graphql";
import { SprintState } from "../../../shared/enums/SprintState";

export default function SprintHeader({ sprint }: { sprint: Sprint }) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [activate] = useMutation(ACTIVATE_SPRINT);

  const handleActivate = () => {
    activate({ variables: { id: sprint.id } });
  };

  let menuItems = [{ label: "Edit", onClick: () => console.log("Edit") }];

  if (sprint.state === SprintState.OPEN) {
    menuItems = menuItems.concat({ label: "Activate", onClick: handleActivate });
  }

  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" gap={1}>
          <Typography variant="body2" fontWeight={500}>
            {sprint.name}
          </Typography>
          <Typography variant="caption">{sprint.state ? "active 🟢" : "not active"}</Typography>
        </Stack>
        <Tooltip title="Edit sprint" arrow>
          <IconButton
            size="small"
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>

      <Menu
        anchorEl={anchorEl!}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        items={menuItems}
      />
    </>
  );
}