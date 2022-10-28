import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assessment-card',
  templateUrl: './assessment-card.component.html',
  styleUrls: ['./assessment-card.component.css']
})
export class AssessmentCardComponent implements OnInit {

  @Input() assessmentID: number = -1;

  @Input() topicID: number = -1;

  @Input() quizID: number = -1;

  @Input() title: string = '';

  @Input() topicTitle: string = '';

  @Input() questionCount: number = -1;

  @Input() bestScore: number = -1;

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
