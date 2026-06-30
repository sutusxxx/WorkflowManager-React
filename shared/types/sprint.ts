import type { SprintState } from "../enums/SprintState";
import type { Issue } from "./issue";
import type { Project } from "./project";

export type Sprint = {
  id: string;
  name: string;
  goal: string;
  startDate: Date;
  endDate: Date;
  issues: Issue[];
  state: SprintState;
  project: Project;
  createdAt: Date;
  updatedAt: Date;
};