import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';
import { environment } from 'src/environments/environment';
import { AuthenticatedResponse } from '../signup/signup.model';

export interface AssessmentResult {
  Score: number,
  AssessmentId: number,
  UserId: number
}

enum QuizStatus {
  Unbegun = 1,
  InProgress,
  Completed
}

@Component({
  selector: 'app-assessment-quiz',
  templateUrl: './assessment-quiz.component.html',
  styleUrls: ['./assessment-quiz.component.css']
})


export class AssessmentQuizComponent implements OnInit {

  quizID: number = -1;

  assessmentID: number = -1;

  topicTitle: string = '';

  questionCount: number = 0;

  questionList: any;

  currQuestion: number = 0;

  quizStatus: QuizStatus = 1;

  dataFetched: Boolean = false;

  currScore: number = 0;

  progressValue: number = 0;

  loading: boolean = false;

  constructor(public router: Router, private httpClient: HttpClient, private userDataService: UserDataService) {

    var state = this.router.getCurrentNavigation()?.extras.state;
    this.quizID = state ? state['quizID'] : -1;
    this.assessmentID = state ? state['assessmentID'] : -1;
    this.topicTitle = state ? state['topicTitle'] : '_______';

  }

  ngOnInit(): void {

    if (this.quizID == -1 && this.assessmentID == -1) {
      this.router.navigate(['/assessments']);
      return;
    }

    this.httpClient.get<any>(environment.baseUrl + '/assessments/quiz/' + this.quizID).subscribe(
      {
        next: (response: any) => {
          this.questionList = response['questions'];
          this.questionCount = this.questionList.length;
          this.dataFetched = true;
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      }
    )
  }

  submitAssessmentResult() {
    var result: AssessmentResult = {
      Score: (this.currScore / this.questionCount) * 100,
      AssessmentId: this.assessmentID,
      UserId: this.userDataService.getUserID()
    }


    this.httpClient.post<AuthenticatedResponse>(environment.baseUrl + '/assessments/quiz/result', result).subscribe(
      {
        next: (response: AuthenticatedResponse) => {
          console.log(response);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        },
      }
    )
  }

  nextQuestion(value: number) {
    this.currScore += value;
    this.progressValue = ((this.currQuestion + 1) / this.questionCount) * 100;
    if (this.currQuestion < this.questionCount - 1) {
      this.currQuestion += 1;
    }
    else {
      this.submitAssessmentResult();
      this.loading = true;
      setTimeout(() => {
        this.quizStatus = 3;
        this.loading = false;
      }, 3000);
    }
  }

}
