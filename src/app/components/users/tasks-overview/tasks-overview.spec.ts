import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksOverview } from './tasks-overview';

describe('TasksOverview', () => {
  let component: TasksOverview;
  let fixture: ComponentFixture<TasksOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksOverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksOverview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
