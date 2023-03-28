import { Component, Input, OnInit } from '@angular/core';
import { TimeWindow } from '../../time-window';
import { isFinished } from '../../task';
import { Timebox } from './timebox';

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

  isFinished() {
    return isFinished(this);
  }

  timeWindowSum(): number {
    return this.timeWindows.length > 0
      ? this.timeWindows
        .map((t) => t.stop - t.start)
        .reduce((sum, t) => sum += t)
      : 0
  }

  estimatedIncrements(): number {
    return Math.ceil(this.estimate / 15);
  }

  progressIncrements(): number {
    return Math.ceil(this.timeWindowSum() / 15);
  }

  timeboxes(): Timebox[] {
    const min = this.estimatedIncrements();
    const max = this.progressIncrements();
    return Array
      .from(Array(max).keys())
      .map((n) => {
        const complete = (n < max);
        const overage = (n > min);
        return {complete, overage};
      });
  }

  progress(): number {
    if (this.estimate === 0) {
      return 100;
    }
    const timeSpent = this.timeWindowSum();
    if (timeSpent > 0) {
      return timeSpent / this.estimate;
    }
    return 0;
  }
}
