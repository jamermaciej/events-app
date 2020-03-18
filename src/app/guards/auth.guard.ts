import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = this.auth.loggedIn();
    if ( !isLoggedIn ) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
