import { Component, OnInit } from '@angular/core';
import{UserServiceService} from './services/user-service.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import{UserUpdate} from './user-update.model';
@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  constructor(public service:UserServiceService,
    private toastr:ToastrService) { }

  ngOnInit(): void {
  }
Update(form: NgForm){
  this.service.putUser().subscribe(
    ()=>{this.resetForm(form);
      this.service.refreshList();
      this.toastr.info('Updated Succesfully','User Profile Updated')});
    
}
resetForm(form:NgForm){
  form.form.reset();
  this.service.formData=new UserUpdate();
}
}
