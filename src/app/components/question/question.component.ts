import { Component, OnInit } from '@angular/core';
import { Questions } from 'src/app/Questions';
import { QuestionsService } from 'src/app/services/questions.service';
import { Quizzes } from 'src/app/Quizzes';
import { QuizzesService } from 'src/app/services/quizzes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  quizzes: Quizzes[] = []
  questions: Questions[] =[]
  splitted: Array<string> = []
  currentAnswer: string = "SomeString"

  constructor(public activatedRoute: ActivatedRoute, public quizService: QuizzesService, public questionService: QuestionsService) { }

  ngOnInit(): void {

    this.quizService.GetQuizzes().subscribe((data: Quizzes[]) => {
      this.quizzes = data;
    });

    this.questionService.GetQuestions().subscribe((data: Questions[]) => {
      this.questions = data;
    });

    this.activatedRoute.paramMap.subscribe(param => {
      let x = param.get('name')
      let qname = x === null || x === undefined ? '' : x;
      this.questionService.GetQuestionsByTitle(qname).subscribe((data: Questions[]) => {
        this.questions = data;
      })

    });
  }

  optionFormatting(str: string): boolean {
    this.splitted = str.split(",",4);
    return true;
  }

  onChange(event: any) {
    this.currentAnswer = event.target.value;
    console.log(this.currentAnswer);
  }

 onClick(q: Questions) {
    console.log(q.toggle)
    for(let ques of this.questions) {
      if(ques === q) {
        ques.toggle = 1;
      }
    }
  }

  onSecondClick(q: Questions) {
    for(let ques of this.questions) {
      if(ques == q) {
        ques.toggle = 0;
      }
    }
   }

}
