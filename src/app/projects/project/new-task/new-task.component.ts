import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Task } from '../../task';
import { ProjectsService } from '../../projects.service'

@Component({
  selector: 'app-new-project-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent {
  @Input() projectUid = '';
  @Output() addTaskEvent = new EventEmitter<Task>();
  taskForm = new FormGroup({
    name: new FormControl(''),
    estimate: new FormControl(0),
    timeWindows: new FormControl([]),
    finished: new FormControl(false),
  })
  constructor(private srvc: ProjectsService) {}
  onSubmit() {
    const name = this.taskForm.get("name")?.value as string;
    const estimate = this.taskForm.get("estimate")?.value as number;
    const uid = Date.now().toString();
    const timeWindows: any[] = [];
    const finished = false;
    const projectUid = this.projectUid;
    const task = {name, estimate, projectUid, uid, timeWindows, finished};
    this.addTaskEvent.emit(task);
  }
}
