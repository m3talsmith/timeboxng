import { TimeWindow } from "./time-window";

export interface Task {
  projectUid: string,
  uid: string,
  estimate: number,
  timeWindows: TimeWindow[],
  finished: boolean,
}
