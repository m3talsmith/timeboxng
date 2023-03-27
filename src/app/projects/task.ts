import { TimeWindow } from "./time-window";

export interface Task {
  projectUid: string,
  uid: string,
  name: string,
  estimate: number,
  timeWindows: TimeWindow[],
  finished: boolean,
}

export function isFinished(task: Task) {
  return (task.finished || task.estimate === 0);
}
