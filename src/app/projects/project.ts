import { Task } from "./task";
import { Timebox } from "./timebox";

export interface Project {
  uid: string;
  name: string;
  tasks: Task[];
}

export const DefaultProject = {
  uid: '',
  name: '',
  tasks: new Array<Task>(),
}

export function timeEstimated(project: Project): number {
  const tasks = project.tasks.map((t) => t.estimate)
  return (tasks.length >= 1) ? tasks.reduce((sum, e) => sum+e) : 0;
}

export function timeSpent(project: Project): number {
  const timeboxes: Timebox[] = project.tasks.filter((t) => t.finished).flatMap((t) => t.timeboxes);
  return timeboxes.length * 15;
}

export function timeLeft(project: Project): number {
  return timeEstimated(project) - timeSpent(project);
}
