import { Component, computed, signal } from '@angular/core';
import { NavBar } from "../../../components/nav-bar/nav-bar";
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-auth',
  imports: [NavBar, MatFormFieldModule, MatInputModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class Auth {
  registrationMode = signal('login')
  authText = computed(() => {
    return this.registrationMode() === 'login' ? 'Welcome Back' : 'Register'
  })
}
