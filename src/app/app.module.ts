import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { AllFacultyComponent } from './components/faculty/faculty/all-faculty/all-faculty.component';
import { AddStudentComponent } from './components/student/add-student/add-student.component';
import { FacultyComponent } from './components/faculty/faculty/add-teacher/faculty.component';
import { AllStudentComponent } from './components/student/all-student/all-student.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuradService } from './services/auth-gurad-service';
import { SignupComponent } from './components/signup/signup.component';
import { AuthInterceptor } from './services/auth-interceptor';
import { PartiesComponent } from './pages/parties/parties.component';
import { AddPartieComponent } from './pages/add-partie/add-partie.component';
import { ViewPartieDetailComponent } from './pages/view-partie-detail/view-partie-detail.component';
import { AddNewGiveAndTakeComponent } from './pages/add-new-give-and-take/add-new-give-and-take.component';
import { UserRoleComponent } from './pages/user-role/user-role.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AddStudentComponent,
    HeaderComponent,
    FacultyComponent,
    AllStudentComponent,
    AllFacultyComponent,
    LoginComponent,
    SignupComponent,
    PartiesComponent,
    AddPartieComponent,
    ViewPartieDetailComponent,
    AddNewGiveAndTakeComponent,
    UserRoleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [AuthGuradService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
