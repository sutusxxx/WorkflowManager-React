import { useSearchParams } from "react-router";
import { QUERY_PARAM } from "../../../shared/constants/queries.constant";
import Dialog from "../../../components/misc/Dialog";
import IssueDetailView, { IssueDetailSkeleton } from "../views/IssueDetailView";

export function useSelectedIssue() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedIssue = searchParams.get(QUERY_PARAM.SELECTED_ISSUE);

  const selectIssue = (issueKey: string) => {
    setSearchParams(prev => {
      prev.set(QUERY_PARAM.SELECTED_ISSUE, issueKey);
      return prev;
    });
  };

  const closeIssue = () => {
    setSearchParams(prev => {
      prev.delete(QUERY_PARAM.SELECTED_ISSUE);
      return prev;
    });
  };

  const dialog = !!selectedIssue
    ? (
      <Dialog fullWidth open onClose={closeIssue} fallback={<IssueDetailSkeleton />}>
        <IssueDetailView issueKey={selectedIssue} />
      </Dialog>
    )
    : null;

  return {
    dialog,
    selectIssue,
  };
}