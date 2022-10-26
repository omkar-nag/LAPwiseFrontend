import { Injectable } from '@angular/core';
import {UserUpdate}from './components/update-profile/user-update.model';
import { HttpClient } from '@angular/common/http';
import { UserDataService } from './user-data.service';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http:HttpClient,public userservice:UserDataService ) { }
  readonly baseURL='http://localhost:5152/api/temp';
  formData:UserUpdate=new UserUpdate();


  putUser(){
    return(this.http.put(`${this.baseURL}/${this.userservice.getUserID}`,this.formData));
  }
}
