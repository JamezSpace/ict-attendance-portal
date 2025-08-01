import { Component, inject } from '@angular/core';
import { 
    MatDialogRef, 
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogClose
} from '@angular/material/dialog';
import { DashboardService } from '../../../services/users/dashboard/dashboard-service';
import { Room } from '../../../interfaces/rooms.interfaces';

@Component({
  selector: 'app-delete-roomspace-dialog',
  imports: [ MatDialogClose ],
  templateUrl: './delete-roomspace-dialog.html',
  styleUrl: './delete-roomspace-dialog.css'
})
export class DeleteRoomspaceDialog {
    readonly dialogRef = inject(MatDialogRef<DeleteRoomspaceDialog>);
    readonly data = inject<Room>(MAT_DIALOG_DATA);
    private adminDshboardService = inject(DashboardService)

    onNoClick(): void {
        this.dialogRef.close();
    }

    deleteRoom() {
        alert('complete this functionality');
        console.log(this.data);
    }
}
