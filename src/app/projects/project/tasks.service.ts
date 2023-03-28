import { Injectable } from '@angular/core';
import { ProjectsService } from '../projects.service';
import { Task } from '../task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private projectsSrvc: ProjectsService) { }

  find(projectUid: string, uid: string) {
    let project = this.projectsSrvc.find(projectUid);
    return project.tasks.find((t) => t.uid === uid)
  }

  save(projectUid: string, task: Task): Task {
    let project = this.projectsSrvc.find(projectUid)
    if (task.uid === '') {
      task.uid = Date.now().toString();
    }
    const i = project.tasks.findIndex((t) => t.uid === task.uid);
    if (i >=0) {
      project.tasks[i] = task;
    } else {
      project.tasks.push(task)
    }
    project = this.projectsSrvc.save(project)
    return task
  }
}
