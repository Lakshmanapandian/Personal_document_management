import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdddocumentComponent } from './adddocument/adddocument.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ManagedocComponent } from './managedoc/managedoc.component';
import { RegisterComponent } from './register/register.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { UsernavComponent } from './usernav/usernav.component';
import { WelcomeadminComponent } from './welcomeadmin/welcomeadmin.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'admin',component:AdminComponent},
  {path:'adddocument',component:AdddocumentComponent},
  {path:'userdashboard',component:DashboardComponent},
  {path:'admindashboard',component:AdminDashboardComponent},
  {path:'usernav',component:UsernavComponent},
  {path:'home',component:HomeComponent},
  {path:'userdashboard',component:UserdashboardComponent},
  {path:'managedoc',component:ManagedocComponent},
  {path:'welcomeadmin',component:WelcomeadminComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
