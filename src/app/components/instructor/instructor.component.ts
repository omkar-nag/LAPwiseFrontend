import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import { Topics } from 'src/app/Topics';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.css']
})
export class InstructorComponent implements OnInit {
  url = environment.baseUrl;
  topics:Topics[] = [];
  constructor(private client:HttpClient, private userService: UserDataService) { }

  ngOnInit(): void {
    this.client.get<Topics[]>(this.url+'/Instructor/')
    .subscribe(
      (data:Topics[])=>{
        this.topics=data
        console.log(this.topics); 
      }
    );
  }

}
