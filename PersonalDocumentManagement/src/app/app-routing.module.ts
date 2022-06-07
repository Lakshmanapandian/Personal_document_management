import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdddocumentComponent } from './adddocument/adddocument.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ManagedocComponent } from './managedoc/managedoc.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { UsernavComponent } from './usernav/usernav.component';
import { WelcomeadminComponent } from './welcomeadmin/welcomeadmin.component'
import { AuthGuard } from './shared/authguard.guard';
import { SharexComponent } from './sharex/sharex.component';

const routes: Routes = [
  {path:"home",redirectTo:'dashboard',pathMatch:'full'},
  {path:'menu',canActivate:[AuthGuard],children:[
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'adddocument',component:AdddocumentComponent},
  {path:'userdashboard',component:DashboardComponent},
  {path:'usernav',component:UsernavComponent},
  {path:'userdashboard',component:UserdashboardComponent},
  {path:'managedoc',component:ManagedocComponent},
  {path:'welcomeadmin',component:WelcomeadminComponent},
  {path:'shareme',component:SharexComponent},

  ]
},
{path:'login',component:LoginComponent},
{path:'admindashboard',component:AdminDashboardComponent},
{path:'admin',component:AdminComponent},
{path:'home',component:HomeComponent},
{path:'',component:HomeComponent},
{path:'register',component:RegisterComponent},
{path:'navbar',component:NavbarComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
