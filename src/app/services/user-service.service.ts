import { Injectable } from '@angular/core';
import { UserUpdate } from '../components/update-profile/update-profile.model';
import { HttpClient } from '@angular/common/http';
import { UserDataService } from './user-data.service';
import { Profile } from '../components/profile/profile.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient, public userservice: UserDataService) { }

  formData: UserUpdate = new UserUpdate();

  putUser() {
    this.formData.id = this.userservice.getUserID();
    return this.http.put(`${environment.baseUrl}/User/${this.userservice.getUserID()}`, this.formData);
  }

  getUser(): Observable<Profile> {
    return this.http.get<Profile>(`${environment.baseUrl}/User/${this.userservice.getUserID()}`);
  }
}
