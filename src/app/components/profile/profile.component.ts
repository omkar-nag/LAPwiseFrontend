import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';
import { environment } from 'src/environments/environment';
import { Profile } from './profile.model';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: Profile = {} as Profile;

  resultsFetched = false;

  @Input() selectedIndex = 0;

  assessmentResults: any;

  @ViewChild(MatAccordion)
  accordion: MatAccordion = new MatAccordion;
  constructor(private userservice: UserServiceService, private httpClient: HttpClient, public router: Router) {
    var state = this.router.getCurrentNavigation()?.extras?.state;
    this.selectedIndex = state ? state['selectedIndex'] : 0;
  }


  ngOnInit(): void {
    this.userservice.getUser().subscribe((data: Profile) => {
      this.profile = data;
    });
    if (this.selectedIndex == 1) {
      this.fetchAssessmentResults();
    }
  }

  fetchAssessmentResults() {
    this.httpClient.get<any>(environment.baseUrl + '/assessments/previous-results')
      .subscribe(response => {
        console.log(response);
        this.assessmentResults = response;
      })
    this.resultsFetched = true;
  }


  formatDateTime(dateStr: string) {
    var now = new Date();
    var dateObj = new Date(dateStr);
    var day = dateObj.getDate() + ' ' + dateObj.toLocaleString('default', { month: 'short' });

    day = (dateObj.getDate() + dateObj.getMonth() == now.getDate() + now.getMonth()) ? 'Today' : day;

    now.setDate(now.getDate() - 1);

    day = (dateObj.getDate() + dateObj.getMonth() == now.getDate() + now.getMonth()) ? 'Yesterday' : day;


    return day + ', ' + dateObj.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  }


  getSelectedIndex() {
    return this.selectedIndex;
  }

  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    if (this.resultsFetched || tabChangeEvent.index != 1) return;
    this.fetchAssessmentResults();
  }


}
