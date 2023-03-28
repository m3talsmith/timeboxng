import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProjectsService } from '../projects.service';
import { isFinished, Task } from '../task';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  @Input() uid = '';
  @Input() name = '';
  @Input() tasks: Task[] = [];
  @Output() updateProjectEvent = new EventEmitter();
  newTaskActive = false;
  progress = 0;

  constructor(private srvc: ProjectsService) {}

  ngOnInit(): void {
      if (this.tasks === undefined) {
        this.tasks = [];
      }
      this.progress = this.calculateProgress();
  }

  newTask() {
    this.newTaskActive = true;
  }

  addTask(task: Task) {
    if (this.tasks == undefined) {
      this.tasks = [];
    }
    this.tasks.push(task)

    const uid = this.uid;
    const name = this.name;
    const tasks = this.tasks;
    const project = this.srvc.save({uid, name, tasks})

    this.updateProjectEvent.emit(project)
    this.newTaskActive = false;
  }

  cancelAddTask() {
    this.newTaskActive = false;
  }

  calculateProgress(): number {
    const finished = this.tasks.filter((t) => isFinished(t))
    return (finished.length / this.tasks.length) * 100;
  }
}
