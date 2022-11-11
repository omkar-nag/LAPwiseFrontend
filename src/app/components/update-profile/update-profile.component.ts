import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Profile } from '../profile/profile.model';
import { PasswordChangeModel } from './password.model';
@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  profile: Profile = {} as Profile
  constructor(private router: Router, public service: UserServiceService, private _snackBar: MatSnackBar, public uservice: UserServiceService) { }
  invalidSignUp: boolean = false;
  hidePassword: boolean = false;
  hideNewPassword:boolean = false;
  toolTip: string = "The password must be of a minimum 8 characters. The password must contain atleast 1 upper case character, 1 lower case character, 1 special character and 1 numeric value";

  passwordModel : PasswordChangeModel = new PasswordChangeModel(); 


  ngOnInit(): void {
    this.service.getUser().subscribe((data: Profile) => {
      this.profile = data;
      console.log(this.profile);
      this.uservice.formData.firstName = this.profile.firstName;
      this.uservice.formData.lastName = this.profile.lastName;
      this.uservice.formData.userName = this.profile.userName;
      this.uservice.formData.email = this.profile.email;
      this.uservice.formData.password = this.profile.password;
    });
    
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000
    });
  }
  Update(form: NgForm) {
    if (form.valid) {
      this.service.putUser().subscribe(
        res => {
          console.log(FormData);
          this.openSnackBar("Updated Successfully", "OK");
          this.router.navigate(["/profile"])
        },

        err => {
          console.log(err);
          this.invalidSignUp = true;
          this.openSnackBar("Update Failed", "OK");
          this.router.navigate(["/profile"])
        });

    }
    else {
      this.invalidSignUp = true;
    }
  }
  UpdatePassword(){
      this.service.putPassword(this.passwordModel).subscribe(
        res => {

          this.openSnackBar("Updated Successfully", "OK");
          this.router.navigate(["/profile"])
        },

        err => {
          console.log(err);
          this.invalidSignUp = true;
          this.openSnackBar("Update Failed", "OK");
          this.router.navigate(["/profile"])
        });

    }
    
  }
