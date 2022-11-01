import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { JwtModule } from '@auth0/angular-jwt';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignupComponent } from './components/signup/signup.component';
import { NotesComponent } from './components/notes/notes.component'

import { AssessmentsComponent } from './components/assessments/assessments.component';
import { AssessmentCardComponent } from './components/assessments/assessment-card/assessment-card.component'
import { AssessmentQuizComponent } from './components/assessment-quiz/assessment-quiz.component';
import { QuizQuestionComponent } from './components/assessment-quiz/quiz-question/quiz-question.component';

import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { ProfileviewComponent } from './components/profileview/profileview.component';

import { SkeletonLoaderModule } from './components/assessments/skeleton-loader/skeleton-loader.module';
import { ContentComponent } from './components/content/content.component';
import { QuestionComponent } from './components/question/question.component';
import { ScrollComponent } from './components/scroll/scroll.component';
import { SubTopicsComponent } from './components/sub-topics/sub-topics.component';
import { TopicsComponent } from './components/topics/topics.component';
import { FullscrLoaderComponent } from './components/assessment-quiz/fullscr-loader/fullscr-loader.component';
import { AssessmentResultsComponent } from './components/assessment-results/assessment-results.component';


export function tokenGetter() {
  return localStorage.getItem("jwt");
}

const materialComponents = [
  BrowserAnimationsModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatSnackBarModule,
  MatButtonModule,
  MatCardModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatTooltipModule,
  MatRadioModule,
  MatProgressBarModule,
  MatTableModule,
]

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    NavbarComponent,
    SignupComponent,
    NotesComponent,
    AssessmentsComponent,
    AssessmentCardComponent,
    UpdateProfileComponent,
    ContentComponent,
    QuestionComponent,
    ScrollComponent,
    SubTopicsComponent,
    TopicsComponent,
    ProfileviewComponent,
    AssessmentQuizComponent,
    QuizQuestionComponent,
    FullscrLoaderComponent,
    AssessmentResultsComponent,

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,

    materialComponents,
    SkeletonLoaderModule,
    ReactiveFormsModule,

    ToastrModule.forRoot(),

    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:5152"],
        disallowedRoutes: []
      }
    }),
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
