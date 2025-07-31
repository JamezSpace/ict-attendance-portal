import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubunitHub } from './subunit-hub';

describe('SubunitHub', () => {
  let component: SubunitHub;
  let fixture: ComponentFixture<SubunitHub>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubunitHub]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubunitHub);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
