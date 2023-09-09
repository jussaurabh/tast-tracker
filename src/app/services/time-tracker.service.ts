import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Task, TimeTracker } from '../utils/interface/time-tracker.interface';
import { DateTime } from 'luxon';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimeTrackerService {
  isDialogOpen = signal(false);
  tasks = signal<{ [id: string]: Task }>({});
  timeTrackers = signal<{ [id: string]: TimeTracker }>({});

  tasks$ = toObservable(this.tasks);
  timeTrackers$ = toObservable(this.timeTrackers);

  constructor() {
    let savedTasks = localStorage.getItem('tasks');
    let savedTrackers = localStorage.getItem('timeTrackers');

    if (savedTasks) this.tasks.set(JSON.parse(savedTasks));
    if (savedTrackers) {
      const trackers = JSON.parse(savedTrackers);
      const tracks: { [id: string]: TimeTracker } = {};
      Object.values(trackers).forEach((tracker: any) => {
        tracks[tracker.id] = {
          ...tracker,
          startTime: DateTime.fromISO(tracker.startTime),
          endTime: tracker.endTime ? DateTime.fromISO(tracker.endTime) : null,
        };
      });

      this.timeTrackers.set(tracks);
    }
  }

  createTask(newTask: Task) {
    const allTask = this.tasks();
    allTask[newTask.id] = newTask;
    localStorage.setItem('tasks', JSON.stringify(allTask));
    this.tasks.set(allTask);
    this.isDialogOpen.set(false);
  }

  deleteTask(id: string) {
    const allTask = this.tasks();
    const timers = allTask[id].timers;
    delete allTask[id];
    const allTimers = this.timeTrackers();
    timers.forEach((timer) => delete allTimers[timer]);

    localStorage.setItem('tasks', JSON.stringify(allTask));
    localStorage.setItem('timeTrackers', JSON.stringify(allTimers));
    this.tasks.set(allTask);
    this.timeTrackers.set(allTimers);
  }

  addTimeTracker({
    newTracker,
    taskId,
  }: {
    newTracker: TimeTracker;
    taskId: string;
  }) {
    const allTrackers = this.timeTrackers();
    const allTask = this.tasks();

    if (!allTask[taskId].timers.includes(newTracker.id))
      allTask[taskId].timers.push(newTracker.id);
    allTrackers[newTracker.id] = newTracker;

    localStorage.setItem('tasks', JSON.stringify(allTask));
    localStorage.setItem('timeTrackers', JSON.stringify(allTrackers));

    this.timeTrackers.set(allTrackers);
    this.tasks.set(allTask);
  }

  getTaskWithTrackers(id: string) {
    let task = this.tasks()[id];
    return task.timers.map((timer) => this.timeTrackers()[timer]);
  }

  stopTracker({
    trackerId,
    endTime,
  }: {
    trackerId: string;
    endTime: DateTime;
  }) {
    let tracker = this.timeTrackers();
    tracker[trackerId].isActive = false;
    tracker[trackerId].endTime = endTime;
    this.timeTrackers.set(tracker);
    localStorage.setItem('timeTrackers', JSON.stringify(tracker));
  }
}
