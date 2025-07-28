import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-new-user-dialog',
  imports: [MatFormFieldModule, MatInputModule],
  templateUrl: './new-user-dialog.html',
  styleUrl: './new-user-dialog.css'
})
export class NewUserDialog {

}
