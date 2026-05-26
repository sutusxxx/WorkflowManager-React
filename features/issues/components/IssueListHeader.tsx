import { Stack, Typography, IconButton } from "@mui/material";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import type { Sprint } from "../../../shared/types/sprint";
import Menu from "../../../components/navigation/Menu";

export default function IssueListHeader({ sprint }: { sprint: Sprint }) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  return (
    <>
      <Stack direction="row" justifyContent="space-between" padding={1}>
        <Typography variant="body2" fontWeight={500}>
          {sprint.name}
        </Typography>
        <IconButton
          size="small"
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          <MenuIcon fontSize="small" />
        </IconButton>
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