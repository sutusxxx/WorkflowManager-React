import { Suspense, type JSX, type ReactNode } from "react";
import DialogMui from "@mui/material/Dialog";
import { DialogContent } from "@mui/material";

type DialogProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode
  fallback?: JSX.Element;
  fullWidth?: boolean;
}

export default function Dialog({ open, onClose, children, fallback, fullWidth }: DialogProps) {
  return (
    <DialogMui open={open} onClose={onClose} fullWidth={fullWidth}>
      <DialogContent>
        <Suspense fallback={fallback}>
          {children}
        </Suspense>
      </DialogContent>
    </DialogMui>
  )
}