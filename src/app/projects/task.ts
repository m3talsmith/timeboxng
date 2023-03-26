import { Timebox } from "./timebox";
export interface Task {
  estimate: number,
  timeboxes: Timebox[],
  finished: boolean,
}
