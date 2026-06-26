import type { SprintState } from "../enums/SprintState";
import type { Issue } from "./issue";

export type Sprint = {
  id: string;
  name: string;
  goal: string;
  startDate: Date;
  endDate: Date;
  issues: Issue[];
  state: SprintState;
  createdAt: Date;
  updatedAt: Date;
};