import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UsersComponent,
    ElderlyComponent,
    AppointmentsComponent,
    MedicationsComponent,
    HealthReportsComponent,
    RelativesComponent,
    AssignmentsComponent,
    NotificationsComponent,
    LandingPageComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
