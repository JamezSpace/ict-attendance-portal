import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Subunits } from './subunit';

describe('Subunits', () => {
  let component: Subunits;
  let fixture: ComponentFixture<Subunits>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Subunits]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Subunits);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
