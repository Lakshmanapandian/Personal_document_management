import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminComponent } from './admin/admin.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { UsernavComponent } from './usernav/usernav.component';
import { AdddocumentComponent } from './adddocument/adddocument.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminnavComponent } from './adminnav/adminnav.component';
import { DatePipe } from '@angular/common';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { ManagedocComponent } from './managedoc/managedoc.component';
import { WelcomeadminComponent } from './welcomeadmin/welcomeadmin.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    NavbarComponent,
    AdminComponent,
    HomeComponent,
    UsernavComponent,
    AdddocumentComponent,
    AdminDashboardComponent,
    AdminnavComponent,
    UserdashboardComponent,
    ManagedocComponent,
    WelcomeadminComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 15000, // 15 seconds
      progressBar: true,
    }),
  ],
  providers: [DatePipe,NavbarComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
