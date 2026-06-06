import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { QUERY_PARAM } from "../../../shared/constants/queries.constant";
import type { Issue } from "../../../shared/types/issue";
import Menu from "../../../components/navigation/Menu";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import Link from "../../../components/navigation/Link";
import { useIssueDelete } from "../hooks/useIssueDelete";

export default function SubIssueList({ subIssues }: { subIssues: Issue[] }) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const hook = useIssueDelete();
  return (
    <Stack spacing={0.5}>
      {subIssues.map((sub) => (
        <Stack
          key={sub.key}
          direction="row"
          justifyContent="space-between"
          sx={{ py: 0.5, borderBottom: "0.5px solid", borderColor: "divider" }}
        >
          <Stack
            direction="row"
            alignItems="center"
            gap={1}
          >
            <Link to={{ search: `?${QUERY_PARAM.SELECTED_ISSUE}=${sub.key}` }}>{sub.key}</Link>
            <Typography variant="body2">{sub.title}</Typography>
          </Stack>
          <Tooltip title="Edit issue" arrow>
            <IconButton
              size="small"
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              <MenuIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl!}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            items={[
              { label: "Edit", onClick: () => console.log("Edit") },
              { label: "Delete", onClick: () => hook.delete(sub.id) },
            ]}
          />
        </Stack>
      ))}
    </Stack>
  );
}