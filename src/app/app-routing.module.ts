import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AssessmentsComponent } from './components/assessments/assessments.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';


// All the exposed routes
const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  { path: 'assessments', component: AssessmentsComponent, canActivate: [AuthService] },
  {path : 'update-profile',component: UpdateProfileComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

// Corresponding components for the routes
export const routingComponents = [HomeComponent, LoginComponent, AssessmentsComponent]