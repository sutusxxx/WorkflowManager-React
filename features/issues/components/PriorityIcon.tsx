import DoubleArrowUp from '@mui/icons-material/KeyboardDoubleArrowUp';
import ArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import ArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import HelpIcon from '@mui/icons-material/Help';
import MenuIcon from '@mui/icons-material/Menu';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Priority } from '../../../shared/enums/Priority';
import type { OverridableComponent } from '@mui/material/OverridableComponent';
import type { SvgIconTypeMap } from '@mui/material/SvgIcon';
import { Tooltip } from '@mui/material';

type PriorityComponent = {
    Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
        muiName: string;
    },
    color: "info" | "primary" | "warning" | "success" | "secondary" | "error";
    tooltip: string;
}

function getPriorityIconComponent(priority: Priority): PriorityComponent {
    switch (priority) {
        case Priority.HIGHEST:
            return { Icon: DoubleArrowUp, color: "error", tooltip: "Highest" };
        case Priority.HIGH:
            return { Icon: ArrowUpIcon, color: "error", tooltip: "High" };
        case Priority.MEDIUM:
            return { Icon: MenuIcon, color: "info", tooltip: "Medium" };
        case Priority.LOW:
            return { Icon: ArrowDownIcon, color: "primary", tooltip: "Low" };
        case Priority.LOWEST:
            return { Icon: DoubleArrowDownIcon, color: "primary", tooltip: "Lowest" };
        case Priority.MINOR:
            return { Icon: RadioButtonUncheckedIcon, color: "info", tooltip: "Minor" };
        case Priority.BLOCKER:
            return { Icon: RemoveCircleIcon, color: "error", tooltip: "Blocker" };
        default:
            return { Icon: HelpIcon, color: "info", tooltip: "" };
    }
}

export default function PriorityIcon({ priority }: { priority: Priority }) {
    const iconComponent = getPriorityIconComponent(priority);

    return (
        <Tooltip title={iconComponent.tooltip} placement="top" arrow>
            <iconComponent.Icon fontSize="small" color={iconComponent.color} />
        </Tooltip>
    );
}