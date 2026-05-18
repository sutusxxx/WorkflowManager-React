import type { Priority } from "../enums/Priority";

export function priorityToTextConverter(priority: Priority) {
  return priority.charAt(0).toUpperCase() + priority.slice(1).toLowerCase();
}