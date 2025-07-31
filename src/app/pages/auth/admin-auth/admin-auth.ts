import { Component } from '@angular/core';
import { NavBar } from "../../../components/nav-bar/nav-bar";
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-admin-auth',
  imports: [ NavBar, MatFormFieldModule, MatInputModule ],
  templateUrl: './admin-auth.html',
  styleUrl: './admin-auth.css'
})
export class AdminAuth {

}
