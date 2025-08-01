import { Component, inject, OnInit, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { DashboardService } from '../../../services/admin/dashboard-service';
import { DashboardService as UserDashboardService } from '../../../services/users/dashboard/dashboard-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface DialogData {
  openedBy: string;
  subunitId?: string;
}

@Component({
  selector: 'app-new-user-dialog',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './new-user-dialog.html',
  styleUrl: './new-user-dialog.css'
})
export class NewUserDialog implements OnInit {
  readonly dialogRef = inject(MatDialogRef<NewUserDialog>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  private adminDashboardService = inject(DashboardService);
  private userDashboardService = inject(UserDashboardService);
  subunits = this.adminDashboardService.subunits;
  selected_subunit = '';

  openedBy = signal<string>('');
  userData = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNum: new FormControl('', Validators.required)
  })

  

  async ngOnInit() {
    if(this.data.openedBy === 'admin') {
      await this.adminDashboardService.getSubunits();
    }

    this.openedBy.set(this.data.openedBy);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async saveData() {    
    if(this.userData.invalid) return;
    
    if (this.data.openedBy === 'admin') {
      await this.adminDashboardService.addUser({
        firstName: this.userData.controls.firstName.value ?? '',
        lastName: this.userData.controls.lastName.value ?? '',
        email: this.userData.controls.email.value ?? '',
        phone: this.userData.controls.phoneNum.value ?? '',
        subunitId: this.selected_subunit
      })
    } else if (this.data.openedBy === 'subunitLeader') {
      await this.userDashboardService.addUserAsSubunitLeader({
        firstName: this.userData.controls.firstName.value ?? '',
        lastName: this.userData.controls.lastName.value ?? '',
        email: this.userData.controls.email.value ?? '',
        phone: this.userData.controls.phoneNum.value ?? '',
        subunitId: this.data.subunitId
      })
    }

    this.dialogRef.close()
  }
}
