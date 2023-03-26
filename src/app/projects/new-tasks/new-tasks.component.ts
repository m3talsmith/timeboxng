import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Task } from '../task';

@Component({
  selector: 'app-new-tasks',
  templateUrl: './new-tasks.component.html',
  styleUrls: ['./new-tasks.component.css']
})
export class NewTasksComponent {
  @Output() addTaskEvent = new EventEmitter<Task>();
  taskForm = new FormGroup({
    estimate: new FormControl(0),
    timeWindows: new FormControl([]),
    finished: new FormControl(false),
  })
}
