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

  credentials: LoginModel = { UserName: '', Password: '' };

  constructor(private router: Router, private http: HttpClient, private _snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  login = (form: NgForm) => {
    console.log(form);
    if (form.valid) {

      this.credentials.UserName = form.value.username;
      this.credentials.Password = form.value.password;

      this.http.post<AuthenticatedResponse>(environment.baseUrl + "/auth/login", this.credentials, {
        headers: new HttpHeaders({ "Content-Type": "application/json" })
      })
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