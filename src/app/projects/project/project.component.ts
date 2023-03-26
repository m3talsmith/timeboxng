import { Component, Input } from '@angular/core';
import { Task } from '../task';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {
  @Input() name = '';
  @Input() tasks: Task[] = [];
  newTaskActive = false;

  newTask() {
    this.newTaskActive = true;
  }

  addTask(task: Task) {
    this.tasks.push(task)
    this.newTaskActive = false;
  }
}
