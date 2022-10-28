import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-quiz-question',
  templateUrl: './quiz-question.component.html',
  styleUrls: ['./quiz-question.component.css']
})
export class QuizQuestionComponent implements OnInit {

  radioGroup: any;

  @Output() submitScore = new EventEmitter<number>();

  @Input() question: string = '';

  @Input() options: Array<string> = [];

  @Input() answer: string = '';

  selectedAnswer: string = '';

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message: string) {
    this._snackBar.open(message, undefined, {
      duration: 2000
    });
  }

  verifyAnswer() {
    if (!this.options.includes(this.selectedAnswer)) {
      return;
    }

    this.openSnackBar(this.answer == this.selectedAnswer ? "✔️ Awarded +1 for the right answer!" : "❌ Wrong!")
    this.submitScore.emit(this.answer == this.selectedAnswer ? 1 : 0);

    this.radioGroup = null;
    this.selectedAnswer = '';

  }

  updateChoice(e: any) {
    this.selectedAnswer = e.value;
  }

  ngOnInit(): void {
  }

}
