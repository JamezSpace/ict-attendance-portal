import { Component, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserProfile } from '../../../interfaces/profile.interface';
import { DashboardService } from '../../../services/users/dashboard/dashboard-service';

@Component({
  selector: 'app-update-profile-dialog',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './update-profile-dialog.html',
  styleUrl: './update-profile-dialog.css'
})
export class UpdateProfileDialog {
  private dashboardService = inject(DashboardService)
  private snackBar = inject(MatSnackBar);
  readonly dialogRef = inject(MatDialogRef<UpdateProfileDialog>);
  readonly data = inject<UserProfile>(MAT_DIALOG_DATA);

  updatedForm = new FormGroup({
    firstName: new FormControl(this.data.firstName, Validators.required),
    lastName: new FormControl(this.data.lastName, Validators.required),
    gender: new FormControl(null, Validators.required),
    province: new FormControl('', Validators.required),
    region: new FormControl('', Validators.required)
  })

  loading = signal(false)
  async saveData() {    
    this.loading.set(!this.loading())

    if (this.updatedForm.invalid) {
      console.log(this.updatedForm);
      this.snackBar.open("Your form has invalid values", '', {
        duration: 3000
      })
      this.loading.set(!this.loading())

      return;
    }

    await this.dashboardService.editUser({
      firstName: this.updatedForm.controls.firstName.value ?? '',
      lastName: this.updatedForm.controls.lastName.value ?? '',
      gender: this.updatedForm.controls.gender.value ?? '',
      province: this.updatedForm.controls.province.value ?? '',
      region: this.updatedForm.controls.region.value ?? ''
    })
    
    this.loading.set(!this.loading())
    this.dialogRef.close()
  }
}
