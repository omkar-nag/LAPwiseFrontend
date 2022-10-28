import { Component, OnInit } from '@angular/core';
import{UserServiceService} from '../../services/user-service.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import{UserUpdate} from './update-profile.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Profile } from '../profileview/profile.model';
@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  profile:Profile={}as Profile
  constructor(private router: Router,public service:UserServiceService,private _snackBar: MatSnackBar,
    private toastr:ToastrService,public uservice:UserServiceService) { }

    hidePassword:boolean=false;
  ngOnInit(): void {
    this.service.getUser().subscribe((data:Profile)=>{
      this.profile=data;
      console.log(this.profile);
      this.uservice.formData.firstName=this.profile.firstName;
      this.uservice.formData.lastName=this.profile.lastName;
      this.uservice.formData.userName=this.profile.userName;
      this.uservice.formData.email=this.profile.email;
      this.uservice.formData.password=this.profile.password;
  });
}
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000
    });
  }
Update(form: NgForm){
  this.service.putUser().subscribe(
    res=>{
   
      this.openSnackBar("UPdated Successfully", "OK");
      this.router.navigate(["/profileview"])},
      
      err=>{console.log(err);
 
        this.openSnackBar("UPdate Failed", "OK");
        this.router.navigate(["/profileview"])
      });
    
}

}

