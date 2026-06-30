import { Suspense, type JSX, type ReactNode } from "react";
import DialogMui from "@mui/material/Dialog";
import { Box, DialogContent, IconButton, Tooltip } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

type DialogProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode
  fallback?: JSX.Element;
  fullWidth?: boolean;
}

export default function Dialog({ open, onClose, children, fallback, fullWidth }: DialogProps) {
  return (
    <DialogMui
      open={open}
      onClose={onClose}
      fullWidth={fullWidth}
      slotProps={{
        paper: {
          sx: {
            position: "relative",
            borderRadius: "25px"
          },
        }
      }}
    >
      <Tooltip title="Close">
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 1,
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <DialogContent sx={{ p: 2 }}>
        <Suspense fallback={fallback}>
          {children}
        </Suspense>
      </DialogContent>
    </DialogMui>
  )
}