import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  WritableSignal,
} from '@angular/core';
import { TimeTrackerService } from './services/time-tracker.service';
import { Task } from './utils/interface/time-tracker.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'time-tracker';
  isDialogOpen: WritableSignal<boolean>;
  tasks: Task[] = [];

  constructor(private timeTracker: TimeTrackerService) {
    this.isDialogOpen = this.timeTracker.isDialogOpen;
  }

  ngOnInit(): void {
    this.timeTracker.tasks$.subscribe((value) => {
      this.tasks = Object.values(value);
    });
  }

  showFormDialog() {
    this.timeTracker.isDialogOpen.set(true);
  }
}
