import { Stack, Typography, IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import type { Sprint } from "../../../shared/types/sprint";
import Menu from "../../../components/navigation/Menu";

export default function IssueListHeader({ sprint }: { sprint: Sprint }) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" gap={1}>
          <Typography variant="body2" fontWeight={500}>
            {sprint.name}
          </Typography>
          <Typography variant="caption">{sprint.active ? "active" : "not active"}</Typography>
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
        items={[
          { label: "Edit", onClick: () => console.log("Edit") }
        ]}
      />
    </>
  );
}