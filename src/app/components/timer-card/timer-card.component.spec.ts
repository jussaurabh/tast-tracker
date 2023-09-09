import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerCardComponent } from './timer-card.component';

describe('TimerCardComponent', () => {
  let component: TimerCardComponent;
  let fixture: ComponentFixture<TimerCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimerCardComponent]
    });
    fixture = TestBed.createComponent(TimerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
