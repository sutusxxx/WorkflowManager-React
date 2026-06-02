import { MenuItem, Typography } from '@mui/material';
import MuiMenu from '@mui/material/Menu';
import { useState } from 'react';

type MenuItem = {
  label: string;
  onClick: () => void;
}

type MenuProps = {
  anchorEl: HTMLElement;
  open: boolean;
  onClose: () => void;
  items: MenuItem[];
}

export default function Menu({ anchorEl, open, onClose, items }: MenuProps) {
  return (
    <MuiMenu
      open={open}
      onClose={onClose}
      anchorEl={anchorEl}
    >
      {items.map(item => (
        <MenuItem onClick={item.onClick} sx={{ minWidth: 100 }}>
          <Typography variant="body2">{item.label}</Typography>
        </MenuItem>
      ))}
    </MuiMenu>
  );
}