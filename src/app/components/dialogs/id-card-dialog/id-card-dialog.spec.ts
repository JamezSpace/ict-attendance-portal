import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdCardDialog } from './id-card-dialog';

describe('IdCardDialog', () => {
  let component: IdCardDialog;
  let fixture: ComponentFixture<IdCardDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdCardDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdCardDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
