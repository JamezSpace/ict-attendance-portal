import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProfileDialog } from './update-profile-dialog';

describe('UpdateProfileDialog', () => {
  let component: UpdateProfileDialog;
  let fixture: ComponentFixture<UpdateProfileDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateProfileDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateProfileDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
