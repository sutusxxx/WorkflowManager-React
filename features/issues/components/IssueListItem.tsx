import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { QUERY_PARAM } from "../../../shared/constants/queries.constant";
import type { Issue } from "../../../shared/types/issue";
import { StatusCategory } from "../../../shared/types/status";
import IssueTypeIcon from "./IssueTypeIcon";
import PriorityIcon from "./PriorityIcon";
import Link from "../../../components/navigation/Link";
import Menu, { type MenuItem } from "../../../components/navigation/Menu";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from "react";

type IssueListItemProps = {
  item: Issue;
  menuItems?: MenuItem[];
  onSelect?: (issue: Issue) => void;
}

export default function IssueListItem({ item, menuItems, onSelect }: IssueListItemProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: "space-between",
      }}
    >
      <Stack direction="row" alignItems="center">
        <IssueTypeIcon issueType={item.type} />
        <PriorityIcon priority={item.priority} />
        <Link
          to={{ search: `?${QUERY_PARAM.SELECTED_ISSUE}=${item.key}` }}
          sx={item.status.category === StatusCategory.DONE ? { textDecoration: "line-through" } : undefined}
        >
          {item.key}
        </Link>
        <Tooltip title={item.status.name} placement="top" arrow>
          <Typography paddingLeft={0.5} variant="body2">{item.title}</Typography>
        </Tooltip>
      </Stack>
      {menuItems &&
        <>
          <IconButton onClick={(event) => setAnchorEl(event.currentTarget)} size="small">
            <MoreVertIcon fontSize="small" />
          </IconButton>
          <Menu anchorEl={anchorEl!} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)} items={menuItems} />
        </>
      }
    </Stack>
  );
}