import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTaskDialog } from './assign-task-dialog';

describe('AssignTaskDialog', () => {
  let component: AssignTaskDialog;
  let fixture: ComponentFixture<AssignTaskDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignTaskDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignTaskDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
