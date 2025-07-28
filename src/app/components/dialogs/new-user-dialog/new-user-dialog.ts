import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-new-user-dialog',
  imports: [MatFormFieldModule, MatInputModule],
  templateUrl: './new-user-dialog.html',
  styleUrl: './new-user-dialog.css'
})
export class NewUserDialog {
  readonly dialogRef = inject(MatDialogRef<NewUserDialog>);

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveData() {
    alert('New user has been saved')
  }
}
