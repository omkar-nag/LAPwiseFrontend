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


// All the exposed routes
const routes: Routes = [
  { path: '', component: HomeComponent, title: "lapwise - Home" },

  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  
  { path: 'notes', component: NotesComponent, canActivate: [AuthService] },
  { path: 'assessments', component: AssessmentsComponent, canActivate: [AuthService] },
  {path : 'update-profile',component: UpdateProfileComponent},
  {path : 'profileview',component: ProfileviewComponent},

  { path: 'login', component: LoginComponent, title: "lapwise - Login" },
  { path: 'signup', component: SignupComponent, title: "lapwise - Signup" },

  { path: 'assessments', component: AssessmentsComponent, canActivate: [AuthService], title: "lapwise - Assessments" },
  { path: 'quiz', component: AssessmentQuizComponent, canActivate: [AuthService], title: "lapwise - Assessment Quiz" },
  { path: 'notes', component: NotesComponent, canActivate: [AuthService] },
  { path: 'update-profile', component: UpdateProfileComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

// Corresponding components for the routes
export const routingComponents = [HomeComponent, LoginComponent, AssessmentsComponent, NotesComponent,UpdateProfileComponent,ProfileviewComponent]
