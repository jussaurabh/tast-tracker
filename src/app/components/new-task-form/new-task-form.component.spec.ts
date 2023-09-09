import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTaskFormComponent } from './new-task-form.component';

describe('NewTaskFormComponent', () => {
  let component: NewTaskFormComponent;
  let fixture: ComponentFixture<NewTaskFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewTaskFormComponent]
    });
    fixture = TestBed.createComponent(NewTaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
