import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userName: string = 'Guest';

  constructor(private userDataService: UserDataService) { }

  ngOnInit(): void {
    this.userName = this.userDataService.getUserName();
    console.log(this.userDataService.getUserID() + this.userDataService.getUserName() + this.userDataService.isUserAuthenticated());
  }

}
