import { Component } from '@angular/core';
import { TimeTrackerService } from 'src/app/services/time-tracker.service';
import { Task } from 'src/app/utils/interface/time-tracker.interface';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-new-task-form',
  templateUrl: './new-task-form.component.html',
  styleUrls: ['./new-task-form.component.css'],
})
export class NewTaskFormComponent {
  title: string = '';

  constructor(private timeTracker: TimeTrackerService) {}

  closeDialog() {
    this.timeTracker.isDialogOpen.set(false);
  }

  createTask() {
    const task: Task = {
      id: uuid(),
      title: this.title,
      timers: [],
    };
    this.timeTracker.createTask(task);
  }
}
