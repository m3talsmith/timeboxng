import { Component, Input, OnInit } from '@angular/core';
import { TimeWindow } from '../../time-window';

@Component({
  selector: 'app-project-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit{
  @Input() projectUid = '';
  @Input() uid = '';
  @Input() name = '';
  @Input() estimate = 0;
  @Input() timeWindows: TimeWindow[] = [];
  @Input() finished = false;

  ngOnInit(): void {
    if (this.estimate === 0) {
      this.finished = true;
    }
  }

  progress(): number {
    if (this.estimate === 0) {
      return 100;
    }
    const timeSpent = this.timeWindows.length > 0
      ? this.timeWindows
        .map((t) => t.stop - t.start)
        .reduce((sum, t) => sum += t)
      : 0
    if (timeSpent > 0) {
      return timeSpent / this.estimate;
    }
    return 0;
  }
}
