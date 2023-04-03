import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AddNewGiveAndTakeComponent } from './pages/add-new-give-and-take/add-new-give-and-take.component';
import { AddPartieComponent } from './pages/add-partie/add-partie.component';
import { PartiesComponent } from './pages/parties/parties.component';
import { UserRoleComponent } from './pages/user-role/user-role.component';
import { ViewPartieDetailComponent } from './pages/view-partie-detail/view-partie-detail.component';
import { AuthenticationGuard } from './services/authentication.guard';

const routes: Routes = [
  {path: '',redirectTo: 'login',pathMatch: 'full'},
  {path: 'login',component: LoginComponent},
  {path: 'sign-up',component: SignupComponent},
  {path: 'all-parties',component: PartiesComponent, canActivate: [AuthenticationGuard]},
  {path: 'add-partie',component: AddPartieComponent, canActivate: [AuthenticationGuard]},
  {path: 'partie-detail',component: ViewPartieDetailComponent, canActivate: [AuthenticationGuard]},
  {path: 'add-new-giveAndTake',component: AddNewGiveAndTakeComponent, canActivate: [AuthenticationGuard]},
  {path: 'add-role',component: UserRoleComponent, canActivate: [AuthenticationGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
