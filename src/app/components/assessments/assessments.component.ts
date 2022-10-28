import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AssessmentsCardModel, AssessmentsQuizModel, AssessmentsTopicModel } from './assessments.model';

@Component({
  selector: 'app-assessments',
  templateUrl: './assessments.component.html',
  styleUrls: ['./assessments.component.css']
})
export class AssessmentsComponent implements OnInit {

  assessmentCardsUnattempted: Array<AssessmentsCardModel> = [];
  assessmentCardsAttempted: Array<AssessmentsCardModel> = [];
  assessmentCardsCompleted: Array<AssessmentsCardModel> = [];

  contentFetched: boolean = false;

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void {

    this.httpClient.get<any>(environment.baseUrl + "/assessments")
      .subscribe({
        next: (response: any) => {
          response.forEach((element: any) => {

            if (element.score == 0)
              this.assessmentCardsUnattempted.push(
                this.createAssessmentCard(element)
              )
            else if (element.score < 100)
              this.assessmentCardsAttempted.push(
                this.createAssessmentCard(element)
              )
            else
              this.assessmentCardsCompleted.push(
                this.createAssessmentCard(element)
              )

          });

          this.contentFetched = true;
        },
        error: (err: HttpErrorResponse) => {
          this.contentFetched = false;
          console.log(err);
        }
      })
  }


  createAssessmentCard = (element: any): AssessmentsCardModel => {
    return <AssessmentsCardModel>{
      AssessmentID: element.assessment.id,
      Title: element.assessment.title,
      Score: element.score,
      Quiz: <AssessmentsQuizModel>{
        Id: element.assessment.quizzes.id,
        Name: element.assessment.quizzes.title,
        QuestionCount: element.assessment.quizzes.questionCount
      },
      Topic: <AssessmentsTopicModel>{
        Id: element.assessment.topics.id,
        Name: element.assessment.topics.name,
        Content: element.assessment.topics.content
      }
    };
  }

}
