import { Injectable, signal } from '@angular/core';
import { Environment } from '../../environments/environment';
import { UserProfile } from '../../interfaces/profile.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public static userLoggedIn = signal<UserProfile | null>(null);
  public static userLoaded = signal(false);

  async loginUser(login_data: any, user: string) {
    try {
      const response = await fetch(`${Environment.backend_api_url}/${user}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(login_data)
      })

      const result = await response.json()
      if (result.token && result.user) {
        localStorage.setItem('access_token', result.token)

        AuthService.userLoggedIn.set(result.user)
      } else return 0

      return 1
    } catch (error) {
      console.error(error);
      return 0
    } finally {
      AuthService.userLoaded.set(true); // <-- signal ready whether it worked or not
    }
  }

  async loadUserFromToken(): Promise<void> {
    const token = localStorage.getItem('access_token');
    if (!token) return;

    try {
      const reponse = await fetch(`${Environment.backend_api_url}/user/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await reponse.json();
      if (data && data.user) {
        AuthService.userLoggedIn.set(data.user);
      }
    } catch (err) {
      console.error("Failed to load user from token", err);
    }
  }

  logout() {
    localStorage.removeItem('access_token');
    AuthService.userLoggedIn.set(null);
  }
}
