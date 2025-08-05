import { Component, inject } from '@angular/core';
import { 
    MatDialogRef, 
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogClose
} from '@angular/material/dialog';
import { DashboardService } from '../../../services/admin/dashboard-service';
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
    private adminDashboardService = inject(DashboardService)

    onNoClick(): void {
        this.dialogRef.close();
    }

    async deleteRoom() {
        if(this.data._id)
            await this.adminDashboardService.deleteRoom(this.data._id);
    }
}
