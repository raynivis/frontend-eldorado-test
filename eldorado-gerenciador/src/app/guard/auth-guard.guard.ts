import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

//guardiao para evitar acesso equivocado do usuario
export const authGuard: CanActivateFn = (route, state) => {
   //JWT do sistema
  const router = inject(Router);
  const loginService = inject(LoginService);
  
  if (loginService.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['login']);
    return false; 
  }
};
