import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NotesComponent } from './components/notes/notes.component';
import { AssessmentsComponent } from './components/assessments/assessments.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { TopicsComponent } from './components/topics/topics.component';
import { SubTopicsComponent } from './components/sub-topics/sub-topics.component';
import { QuestionComponent } from './components/question/question.component';


// All the exposed routes
const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  
  { path: 'notes', component: NotesComponent, canActivate: [AuthService] },
  { path: 'assessments', component: AssessmentsComponent, canActivate: [AuthService] },
  { path: 'update-profile', component: UpdateProfileComponent },

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
export const routingComponents = [HomeComponent, LoginComponent, AssessmentsComponent, NotesComponent]
