import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserDialog } from './new-user-dialog';

describe('NewUserDialog', () => {
  let component: NewUserDialog;
  let fixture: ComponentFixture<NewUserDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewUserDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewUserDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
