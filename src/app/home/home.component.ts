import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userName: string = 'Guest';
  constructor(private jwtHelper: JwtHelperService, private router: Router) { }

  isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    return false;
  }


  logOut() {
    localStorage.removeItem("jwt");
  }

  redirectToLogin() {
    this.router.navigate(["/login"]);
  }

  ngOnInit(): void {

    const tokenData = this.jwtHelper.decodeToken(localStorage.getItem("jwt") || '');
    console.log(tokenData);
    this.userName = tokenData ? tokenData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] : 'Guest User';

  }

}
