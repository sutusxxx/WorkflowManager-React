import type { Connection } from "../../../shared/interfaces/connection"
import type { Issue } from "../../../shared/types/issue"

export type BacklogResponse = {
  backlog: Connection<Issue>;
}