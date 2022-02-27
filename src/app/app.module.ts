import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import {ToastrModule} from 'ngx-toastr';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
//import { RegistrationComponent } from './user/registration/registration.component';
import { ManagerRegistrationComponent } from './user/manager-registration/manager-registration.component';
import { UserService } from './shared/user.service';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AddTenantComponent } from './add-tenant/add-tenant.component';
import { AddBuildingComponent } from './add-building/add-building.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { NotallowedComponent } from './notallowed/notallowed.component';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { AddTenantService } from './shared/add-tenant.service';
import { AddBuildingService } from './shared/add-building.service';
import { JoinflatComponent } from './joinflat/joinflat.component';
import { RequestComponent } from './request/request.component';
import { VotingComponent } from './voting/voting.component';





//import { AddcomanagerListComponent } from './addcomanager/addcomanager-list/addcomanager-list.component';
import {TenantListComponent  } from "./tenant-list/tenant-list.component";
import { StatisticsComponent } from './user/statistics/statistics.component';



import { MapModule } from './map/map.module';

import { FlatComponent } from './flat/flat.component';
import { ChartsModule } from 'ng2-charts';
import { UserprofileComponent } from './userprofile/userprofile.component';



@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ManagerRegistrationComponent,
    LoginComponent,
    HomeComponent,
    AddTenantComponent,
    AddBuildingComponent,
    ForbiddenComponent,
    NotallowedComponent,
    AdminpanelComponent,
    JoinflatComponent,
    RequestComponent,
    VotingComponent,
    
   
    //AddcomanagerListComponent,
    TenantListComponent,
   
    StatisticsComponent, 
    FlatComponent, UserprofileComponent   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot({progressBar:true}),
    MapModule,
    ChartsModule
  ],
  providers: [UserService,AddTenantService,AddBuildingService,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
