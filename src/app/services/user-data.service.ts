import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})

export class UserDataService {

  tokenData: any;

  constructor(private jwtHelper: JwtHelperService) { }

  getUserName = (): string => {
    this.tokenData = this.jwtHelper.decodeToken(localStorage.getItem("jwt") || '');
    return this.tokenData ? this.tokenData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] : 'Guest';
  }

  getUserID = (): number => {
    this.tokenData = this.jwtHelper.decodeToken(localStorage.getItem("jwt") || '');
    return this.tokenData ? this.tokenData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] : '-1';
  }

  isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("jwt")
    if (token && !this.jwtHelper.isTokenExpired(token)) return true;
    return false;
  }

}
