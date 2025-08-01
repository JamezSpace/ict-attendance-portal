import { Injectable, signal } from '@angular/core';
import { Environment } from '../../environments/environment';
import { UserProfile } from '../../interfaces/profile.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    public static userLoggedIn = signal<UserProfile| null>(null);

    async loginUser(login_data: any) {
      try {
        const response = await fetch(`${Environment.backend_api_url}/user/auth/login`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(login_data)
        })

        const result = await response.json()
        if(result.token && result.user) {
          localStorage.setItem('access_token', result.token)

          sessionStorage.setItem('user', JSON.parse(result.user))

          AuthService.userLoggedIn.set(result.user)
        } else return 0

        return 1
      } catch (error) {
        console.error(error); 
        return 0       
      }
    }
}
