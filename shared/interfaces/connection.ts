import type { Edge } from "./edge";
import type { PageInfo } from "./page-info";

export interface Connection<T> {
  pageInfo: PageInfo;
  edges: Edge<T>[];
}