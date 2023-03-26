import { TimeWindow } from "./time-window";

export interface Task {
  estimate: number,
  timeWindows: TimeWindow[],
  finished: boolean,
}
