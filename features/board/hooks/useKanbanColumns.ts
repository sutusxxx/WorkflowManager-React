import { useMemo } from "react";
import type { Sprint } from "../../../shared/types/sprint";
import type { Issue } from "../../../shared/types/issue";

function orderByChain(issues: Issue[]): Issue[] {
  if (issues.length <= 1) return issues;

  const byId = new Map(issues.map(i => [i.id, i]));
  const allNextIds = new Set(issues.map(i => i.nextIssueId).filter(Boolean));

  const head = issues.find(i => !allNextIds.has(i.id));
  if (!head) return issues;

  const ordered: Issue[] = [];
  const visited = new Set<string>();
  let current: Issue | undefined = head;

  while (current) {
    if (visited.has(current.id)) break;
    visited.add(current.id);
    ordered.push(current);
    current = current.nextIssueId ? byId.get(current.nextIssueId) : undefined;
  }

  const missing = issues.filter(i => !visited.has(i.id));
  return [...ordered, ...missing];
}

export function useKanbanColumns(sprint: Sprint) {
  return useMemo(() => {
    const sortedStatuses = [...sprint.project.statuses].sort(
      (a, b) => a.displayOrder - b.displayOrder
    );

    return sortedStatuses.map(status => {
      const issuesInStatus = sprint.issues.filter(issue => issue.status.id === status.id);
      return {
        status,
        issues: orderByChain(issuesInStatus),
      };
    });
  }, [sprint]);
}