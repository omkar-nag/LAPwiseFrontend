import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';
import { environment } from 'src/environments/environment';
import { Profile } from './profile.model';
@Component({
  selector: 'app-profileview',
  templateUrl: './profileview.component.html',
  styleUrls: ['./profileview.component.css']
})
export class ProfileviewComponent implements OnInit {

  profile: Profile = {} as Profile;

  resultsFetched = false;

  assessmentResults: any;
  @ViewChild(MatAccordion)
  accordion: MatAccordion = new MatAccordion;
  constructor(private userservice: UserServiceService, private httpClient: HttpClient, public router: Router) { }

  ngOnInit(): void {
    this.userservice.getUser().subscribe((data: Profile) => {
      this.profile = data;
    });
  }

  fetchAssessmentResults() {
    this.httpClient.get<any>(environment.baseUrl + '/assessments/previous-results')
      .subscribe(response => {
        console.log(response);
        this.assessmentResults = response;
      })
  }


  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    if (this.resultsFetched || tabChangeEvent.index != 1) return;
    this.fetchAssessmentResults();
    this.resultsFetched = true;
  }


}
