import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { DateTime } from 'luxon';
import { TimeTrackerService } from 'src/app/services/time-tracker.service';
import {
  Task,
  TimeTracker,
} from 'src/app/utils/interface/time-tracker.interface';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-timer-card',
  templateUrl: './timer-card.component.html',
  styleUrls: ['./timer-card.component.css'],
})
export class TimerCardComponent implements OnDestroy, OnInit {
  time = '00 : 00 : 00';

  @Input() task: Task | undefined;
  timeTrackers: TimeTracker[] = [];
  tracker: TimeTracker | undefined | null;
  timeInterval: any | undefined;

  ngOnDestroy(): void {
    if (this.timeInterval) clearInterval(this.timeInterval);
  }

  constructor(private timeTracker: TimeTrackerService) {}

  ngOnInit(): void {
    if (this.task) {
      this.timeTrackers = this.task
        ? this.timeTracker.getTaskWithTrackers(this.task?.id!)
        : [];

      this.tracker = this.timeTrackers.find((timer) => timer.isActive);

      if (this.tracker) {
        this.startTimer();
      }
    }
  }

  deleteTask() {
    this.timeTracker.deleteTask(this.task?.id!);
  }

  startTimer() {
    if (!this.tracker) {
      this.tracker = {
        isActive: true,
        id: uuid(),
        startTime: DateTime.now(),
      };
      this.startClock(this.tracker);
      this.timeTrackers.push(this.tracker);
    } else {
      this.startClock(this.tracker);
    }
  }

  startClock(tracker: TimeTracker) {
    this.timeTracker.addTimeTracker({
      newTracker: tracker,
      taskId: this.task?.id!,
    });
    const startTime = tracker.startTime;
    this.timeInterval = setInterval(() => {
      const now = DateTime.now();

      const duration = now.diff(startTime!, 'seconds');
      this.time = `${duration.toFormat('hh : mm : ss')}`;
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timeInterval);
    this.timeTracker.stopTracker({
      trackerId: this.tracker?.id!,
      endTime: DateTime.now(),
    });
    this.time = '00 : 00 : 00';
    this.tracker = null;
  }
}
