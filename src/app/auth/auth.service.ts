import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(private router: Router, private jwtHelper: JwtHelperService) { }

  canActivate(): boolean {

    const token = localStorage.getItem("jwt")

    if (token && !this.jwtHelper.isTokenExpired(token)) return true;

    this.router.navigate(["/login"]);

    return false;
  }
}
