import { Component, computed, inject, signal } from '@angular/core';
import { NavBar } from "../../../components/nav-bar/nav-bar";
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth/auth-service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-admin-auth',
  imports: [ NavBar, MatFormFieldModule, MatInputModule, FormsModule, MatProgressSpinnerModule ],
  templateUrl: './admin-auth.html',
  styleUrl: './admin-auth.css'
})
export class AdminAuth {
  private authService = inject(AuthService);
    private snackBar = inject(MatSnackBar);
    private router = inject(Router);

    ngOnInit(): void {
        if(localStorage.getItem("access_token")) 
            localStorage.removeItem("access_token")
    }

    email = '';
    password = '';
    loading = signal(false)

    async login() {
        this.loading.set(true);

        const success_status = await this.authService.loginUser({
            email: this.email.toLowerCase(),
            password: this.password
        })

        this.loading.set(false);
        if (success_status == 1) {
          this.router.navigate(["/admin"])
        } else if (success_status == 0) {
          this.snackBar.open("Invalid Email and Password Combination", "", {
              duration: 3000
          })
        } else {
          alert("something went wrong. Relogin")
        }
    }
}
