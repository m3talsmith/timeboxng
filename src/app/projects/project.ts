import { Task } from "./task";

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
  return project.tasks
    .filter((t) => t.finished)
    .flatMap((t) => t.timeWindows)
    .map((t) => {
      const start = Date.parse(t.start.toString());
      const stop = Date.parse(t.stop.toString());
      return stop - start;
    })
    .reduce((sum, t) => sum += t);
}

export function timeLeft(project: Project): number {
  return timeEstimated(project) - timeSpent(project);
}
