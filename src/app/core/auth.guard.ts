import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('AuthGuard ejecutado');
  console.log('Usuario actual:', authService.currentUser);
  console.log('Está autenticado:', authService.isAuthenticated());

  if (authService.isAuthenticated()) {
    return true;
  }

  // Redirigir al login si no está autenticado
  console.log('No autenticado, redirigiendo a login');
  router.navigate(['/login']);
  return false;
};


