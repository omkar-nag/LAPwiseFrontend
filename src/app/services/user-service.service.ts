import { Injectable } from '@angular/core';
import {UserUpdate}from '../components/update-profile/update-profile.model';
import { HttpClient } from '@angular/common/http';
import { UserDataService } from './user-data.service';
import { Profile } from '../components/profileview/profile.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http:HttpClient,public userservice:UserDataService ) { }
  readonly baseURL='http://localhost:5152/api/User';
  formData:UserUpdate=new UserUpdate();


 // putUser(){
  //  return(this.http.put(`${this.baseURL}/${this.userservice.getUserID()}`,this.formData));
 // }
   putUser(){
    this.formData.Id=this.userservice.getUserID();
    return(this.http.put(`${this.baseURL}/${this.userservice.getUserID()}`,this.formData));
  }
  getUser():Observable<Profile>{
    return(this.http.get<Profile>(`${this.baseURL}/${this.userservice.getUserID()}`))
}
}
