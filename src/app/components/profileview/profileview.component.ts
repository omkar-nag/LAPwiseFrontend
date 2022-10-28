import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';
import { Profile } from './profile.model';
@Component({
  selector: 'app-profileview',
  templateUrl: './profileview.component.html',
  styleUrls: ['./profileview.component.css']
})
export class ProfileviewComponent implements OnInit {
 profile:Profile={}as Profile
  constructor(public userservice:UserServiceService) { }

  ngOnInit(): void {
    this.userservice.getUser().subscribe((data:Profile)=>{
      this.profile=data;
      console.log(this.profile)
  });
}
}
