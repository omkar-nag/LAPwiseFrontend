import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToastrModule } from 'ngx-toastr';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignupComponent } from './components/signup/signup.component';
import { AssessmentsComponent } from './components/assessments/assessments.component';
import { AssessmentCardComponent } from './components/assessments/assessment-card/assessment-card.component'
import { SkeletonLoaderModule } from './components/assessments/skeleton-loader/skeleton-loader.module';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';


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
  MatTooltipModule,
  ToastrModule.forRoot()
]

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    NavbarComponent,
    SignupComponent,
    AssessmentsComponent,
    AssessmentCardComponent,
    UpdateProfileComponent,

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,


    materialComponents,
    SkeletonLoaderModule,

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

