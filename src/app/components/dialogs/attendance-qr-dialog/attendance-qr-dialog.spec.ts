import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceQrDialog } from './attendance-qr-dialog';

describe('AttendanceQrDialog', () => {
  let component: AttendanceQrDialog;
  let fixture: ComponentFixture<AttendanceQrDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceQrDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceQrDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
