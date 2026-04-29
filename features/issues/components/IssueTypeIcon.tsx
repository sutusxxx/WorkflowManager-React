
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ChecklistIcon from '@mui/icons-material/Checklist';
import BugReportIcon from '@mui/icons-material/BugReport';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import type { OverridableComponent } from "@mui/material/OverridableComponent";
import { Tooltip, type SvgIconTypeMap } from "@mui/material";
import { IssueType } from '../../../shared/enums/IssueType';

type PriorityComponent = {
    Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
        muiName: string;
    },
    color: "info" | "primary" | "warning" | "success" | "secondary" | "error";
    tooltip: string;
}

function getIssueTypeComponnent(issueType: IssueType): PriorityComponent {
    switch (issueType) {
        case IssueType.EPIC:
            return { Icon: SpaceDashboardIcon, color: "secondary", tooltip: "Epic" };
        case IssueType.STORY:
            return { Icon: AssignmentIcon, color: "primary", tooltip: "Story" };
        case IssueType.TASK:
            return { Icon: CheckBoxIcon, color: "primary", tooltip: "Task" };
        case IssueType.SUBTASK:
            return { Icon: ChecklistIcon, color: "primary", tooltip: "Sub-Task" };
        case IssueType.BUGFIX:
            return { Icon: BugReportIcon, color: "error", tooltip: "Bugfix" };
    }
}

export default function IssueTypeIcon({ issueType }: { issueType: IssueType }) {
    const iconComponent = getIssueTypeComponnent(issueType);
    
    return (
        <Tooltip title={iconComponent.tooltip} placement="top" arrow>
            <iconComponent.Icon color={iconComponent.color} fontSize="small" />
        </Tooltip>
    )
}