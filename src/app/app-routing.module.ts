import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/auth.service';
import { DepartmentListComponent } from './components/department-list/department-list.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { UserServiceService } from './services/user-service.service';

// All the exposed routes
const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {path : 'update-profile',component: UpdateProfileComponent},
  { path: 'departments', component: DepartmentListComponent, canActivate: [AuthService] },
  { path: 'employees', component: EmployeeListComponent, canActivate: [AuthService] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

// Corresponding components for the routes
export const routingComponents = [HomeComponent, LoginComponent, DepartmentListComponent, EmployeeListComponent]