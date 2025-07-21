import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { MyJwtPayload } from '../interfaces/jwt-payload.interface';


export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('access_token');

  if (!token) {
    router.navigate(['/auth']);
    return false;
  }

  try {
    const decoded = jwtDecode<MyJwtPayload>(token);

    // Token expiry check (assuming exp is in seconds)
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem('access_token');
      router.navigate(['/auth']);
      return false;
    }

    // Role-based access control
    const requiredRoles = route.data['roles'] as string[];
    if (requiredRoles && !requiredRoles.includes(decoded.role ?? '')) {
      router.navigate(['/auth']); // or to a "403" page
      return false;
    }

    return true;
  } catch (err) {
    localStorage.removeItem('access_token');
    router.navigate(['/auth']);
    return false;
  }
};

