export type Status = {
    id: string;
    name: string;
    color: string;
    category: StatusCategory;
    allowedTransitionIds: string[];
};

export enum StatusCategory {
    TODO = "TODO",
    IN_PPROGRESS = "IN_PROGRESS",
    DONE = "DONE",
}