import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { environment } from '../../environments/environment'
import { AuthenticatedResponse, LoginModel } from './login.model';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  invalidLogin: boolean = false;

  hidePassword = true;

  userName = '';

  credentials: LoginModel = { UserName: this.userName, Password: '' };

  constructor(private router: Router, private httpClient: HttpClient, private _snackBar: MatSnackBar) {
    var state = this.router.getCurrentNavigation()?.extras?.state;
    this.userName = state == undefined ? '' : state['username'];
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  login = (form: NgForm) => {
    if (form.valid) {
      this.credentials.UserName = this.userName;
      this.httpClient.post<AuthenticatedResponse>(environment.baseUrl + "/auth/login", this.credentials)
        .subscribe({
          next: (response: AuthenticatedResponse) => {
            const token = response.token;
            localStorage.setItem("jwt", token);
            this.invalidLogin = false;
            this.router.navigate(["/"]);
          },
          error: (err: HttpErrorResponse) => {
            this.invalidLogin = true;
            this.openSnackBar("Login failed", "OK");
            console.log(err);
          }
        })
    }
  }

  ngOnInit(): void { }

}