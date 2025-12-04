import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { ElderlyComponent } from './components/elderly/elderly.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { MedicationsComponent } from './components/medications/medications.component';
import { HealthReportsComponent } from './components/health-reports/health-reports.component';
import { RelativesComponent } from './components/relatives/relatives.component';
import { AssignmentsComponent } from './components/assignments/assignments.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      { path: 'users', component: UsersComponent },
      { path: 'elderly', component: ElderlyComponent },
      { path: 'appointments', component: AppointmentsComponent },
      { path: 'medications', component: MedicationsComponent },
      { path: 'health-reports', component: HealthReportsComponent },
      { path: 'relatives', component: RelativesComponent },
      { path: 'assignments', component: AssignmentsComponent },
      { path: 'notifications', component: NotificationsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
