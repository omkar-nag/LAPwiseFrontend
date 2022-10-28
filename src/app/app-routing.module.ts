import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NotesComponent } from './components/notes/notes.component';
import { AssessmentsComponent } from './components/assessments/assessments.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { ProfileviewComponent } from './components/profileview/profileview.component';
import { AssessmentQuizComponent } from './components/assessment-quiz/assessment-quiz.component';
import { TopicsComponent } from './components/topics/topics.component';
import { SubTopicsComponent } from './components/sub-topics/sub-topics.component';
import { QuestionComponent } from './components/question/question.component';


// All the exposed routes
const routes: Routes = [
  { path: '', component: HomeComponent, title: "lapwise - Home" },

  { path: 'login', component: LoginComponent, title: "lapwise - Login" },
  { path: 'signup', component: SignupComponent, title: "lapwise - Signup" },
  
  { path: 'notes', component: NotesComponent, canActivate: [AuthService] },
  { path: 'assessments', component: AssessmentsComponent, canActivate: [AuthService] },
  

  { path: 'assessments', component: AssessmentsComponent, canActivate: [AuthService], title: "lapwise - Assessments" },
  { path: 'quiz', component: AssessmentQuizComponent, canActivate: [AuthService], title: "lapwise - Assessment Quiz" },

  { path: 'update-profile', component: UpdateProfileComponent, title: "lapwise - Update Profile" },
  { path: 'profileview', component: ProfileviewComponent, title: "lapwise - View Profile" },

  { path: 'dashboard', component: TopicsComponent },
  { path: 'dashboard/subtopic/:id', component: SubTopicsComponent },
  { path: 'dashboard/question/:name', component: QuestionComponent }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

// Corresponding components for the routes
export const routingComponents = [HomeComponent, LoginComponent, AssessmentsComponent, NotesComponent, UpdateProfileComponent, ProfileviewComponent]
