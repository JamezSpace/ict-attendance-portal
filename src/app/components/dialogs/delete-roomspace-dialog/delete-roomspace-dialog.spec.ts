import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRoomspaceDialog } from './delete-roomspace-dialog';

describe('DeleteRoomspaceDialog', () => {
  let component: DeleteRoomspaceDialog;
  let fixture: ComponentFixture<DeleteRoomspaceDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteRoomspaceDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteRoomspaceDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
