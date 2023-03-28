import { Component, Input, OnInit } from '@angular/core';
import { TimeWindow } from '../../time-window';
import { isFinished } from '../../task';
import { Timebox } from './timebox';
import { TasksService } from '../tasks.service';

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
  running = false;

  constructor(private srvc: TasksService) {}

  ngOnInit(): void {
    this.finished = this.isFinished();
    this.running = this.inProgress();
  }

  nextWindow() {
    const windows = this.timeWindows.filter((t) => t.stop === 0);
    if (windows.length > 0) {
      return windows[0];
    }
    return null;
  }

  newWindow(): TimeWindow {
    return {start: Date.now(), stop: 0};
  }

  isFinished(): boolean {
    return isFinished(this);
  }

  inProgress(): boolean {
    const window = this.nextWindow();
    return window != null;
  }

  start() {
    const window = this.newWindow();
    this.timeWindows.push(window);
    this.running = true;
    this.srvc.save(this.projectUid, this);
  }

  pause() {
    const stop = Date.now();
    let window = this.nextWindow();
    if (window) {
      const i = this.timeWindows.findIndex((t) => t == window);
      window.stop = stop;
      if (i >= 0) {
        this.timeWindows[i] = window;
      } else {
        this.timeWindows.push(window)
      }
    } else {
      this.timeWindows.push({start: stop, stop});
    }
    this.running = this.inProgress();
    const task = this.srvc.save(this.projectUid, this);
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
    let x = min > max ? min : max
    return Array.from(Array(x+1).keys())
      .map((n) => {
        const complete = (n < max);
        const overage = (n >= min && n-1 < max);
        const box = {complete, overage};
        return box;
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
