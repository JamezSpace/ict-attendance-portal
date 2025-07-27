import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarIndex } from './nav-bar-index';

describe('NavBarIndex', () => {
  let component: NavBarIndex;
  let fixture: ComponentFixture<NavBarIndex>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarIndex]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBarIndex);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
