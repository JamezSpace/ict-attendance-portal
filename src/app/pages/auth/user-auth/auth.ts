import { Component, computed, inject, signal } from '@angular/core';
import { NavBar } from "../../../components/nav-bar/nav-bar";
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSnackBar
} from '@angular/material/snack-bar'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../../services/auth/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [NavBar, MatFormFieldModule, MatInputModule, FormsModule, MatProgressSpinnerModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class Auth {
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  registrationMode = signal('login')
  authText = computed(() => {
    return this.registrationMode() === 'login' ? 'Welcome Back' : 'Register'
  })

  email = '';
  password = '';
  loading = signal(false)

  async login() {
    this.loading.set(true);

    const success_status = await this.authService.loginUser({
      email: this.email,
      password: this.password
    })

    this.loading.set(false);
    if(success_status == 1) {
      this.router.navigate(["/dashboard"])
    } else if(success_status == 0){
      this.snackBar.open("Invalid Email and Password Combination")
    } else {
      alert("something went wrong. Relogin")
    }
  }
}
