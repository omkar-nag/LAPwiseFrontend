import { Component, OnInit } from '@angular/core';
import { SignupModel, AuthenticatedResponse } from './signup.model';

import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { environment } from '../../../environments/environment'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  invalidSignUp: boolean = false;
  hidePassword = true;

  credentials: SignupModel = {
    FirstName: '',
    LastName: '',
    UserName: '',
    Email: '',
    Password: ''
  };

  constructor(private router: Router, private httpClient: HttpClient, private _snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000
    });
  }

  signUp = (form: NgForm) => {
    if (form.valid) {
      this.httpClient.post<AuthenticatedResponse>(environment.baseUrl + "/auth/signup", this.credentials)
        .subscribe({
          next: (response: AuthenticatedResponse) => {
            this.openSnackBar(response.message, "OK");
            this.router.navigate(["/login"], {
              state: {
                username: this.credentials.UserName
              }
            });
          },
          error: (err: HttpErrorResponse) => {
            this.invalidSignUp = true;
            console.log(err);
            this.openSnackBar(err.error.message, "OK");
          }
        })
    }
    else {
      this.invalidSignUp = true;
      alert("invalid");
    }
  }
  ngOnInit(): void {
  }
}
