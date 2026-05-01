import { Dialog, DialogContent } from "@mui/material";
import { Suspense } from "react";
import { useSearchParams } from "react-router";
import { QUERY_PARAM } from "../../../shared/constants/queries.constant";
import IssueDetailView, { IssueDetailSkeleton } from "../views/IssueDetailView";

export default function IssueDetailDialog() {
    const [searchParams, setSearchParams] = useSearchParams();

    const handleIssueDialogClose = () => setSearchParams(prev => {
        prev.delete(QUERY_PARAM.SELECTED_ISSUE);
        return prev;
    });

    return searchParams.has(QUERY_PARAM.SELECTED_ISSUE) &&
        <Dialog open onClose={handleIssueDialogClose} fullWidth>
            <DialogContent>
                <Suspense fallback={<IssueDetailSkeleton />}>
                    <IssueDetailView issueKey={searchParams.get(QUERY_PARAM.SELECTED_ISSUE)!} />
                </Suspense>
            </DialogContent>
        </Dialog>;

}