import type { Page } from "../../../shared/interfaces/page"
import type { Sprint } from "../../../shared/types/sprint";

export type SprintListResponse = {
  sprints: Page<Sprint>;
}