import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAttendanceRoomspaceDialog } from './add-attendance-roomspace-dialog';

describe('AddAttendanceRoomspaceDialog', () => {
  let component: AddAttendanceRoomspaceDialog;
  let fixture: ComponentFixture<AddAttendanceRoomspaceDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAttendanceRoomspaceDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAttendanceRoomspaceDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
