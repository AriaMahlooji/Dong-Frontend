import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{UserComponent}from './user/user.component'
import { ManagerRegistrationComponent } from './user/manager-registration/manager-registration.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import  { AddTenantComponent } from './add-tenant/add-tenant.component';
import { AddBuildingComponent } from './add-building/add-building.component';
import { AuthGuard } from './auth/auth.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { NotallowedComponent } from './notallowed/notallowed.component';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { JoinflatComponent } from "./joinflat/joinflat.component";
import { RequestComponent } from './request/request.component';
import { VotingComponent } from './voting/voting.component';
import { TenantListComponent } from "./tenant-list/tenant-list.component";
import { StatisticsComponent } from "./user/statistics/statistics.component";
import { UserprofileComponent } from './userprofile/userprofile.component'; 

import { FlatComponent } from './flat/flat.component';




const routes: Routes = 
[
  {path:"",redirectTo:'/user/manager-registration',pathMatch:'full'},
  { path:'user',component:UserComponent,
    children: [
                {path:'manager-registration',component:ManagerRegistrationComponent},
                {path:'login',component:LoginComponent}
              ]
  },
  {path:"home",component:HomeComponent,canActivate:[AuthGuard],data :{permittedRoles:['User']}},
  {path:"add-tenant",component:AddTenantComponent,canActivate:[AuthGuard],data :{permittedRoles:['User']}},
  {path:"add-building",component:AddBuildingComponent,canActivate:[AuthGuard],data :{permittedRoles:['User']}},
  {path:"forbidden",component:ForbiddenComponent},
  {path:"notallowed",component:NotallowedComponent,canActivate:[AuthGuard],data :{permittedRoles:['Hichi']}},
  {path:"adminpanel",component:AdminpanelComponent,canActivate:[AuthGuard],data :{permittedRoles:['Manager']}},
  {path:"joinflat",component:JoinflatComponent,canActivate:[AuthGuard],data :{permittedRoles:['User']}},
  {path:"request",component:RequestComponent,canActivate:[AuthGuard],data :{permittedRoles:['User']}},
  {path:"voting",component:VotingComponent,canActivate:[AuthGuard],data :{permittedRoles:['User']}},
  {path:"tenant-list",component:TenantListComponent,canActivate:[AuthGuard],data :{permittedRoles:['User']}},
  {path:"user/statistics",component:StatisticsComponent},
  {path: "userprofile",component:UserprofileComponent,canActivate:[AuthGuard],data :{permittedRoles:['User']}},
  {path:"flatdesc",component:FlatComponent},

  
 


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
