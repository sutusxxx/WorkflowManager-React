import type { Issue } from "./issue";

export type Sprint = {
  id: string;
  name: string;
  goal: string;
  startDate: Date;
  endDate: Date;
  issues: Issue[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};