import { Component, OnInit } from '@angular/core';
import { longStackSupport } from 'q';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import {AuthGuard} from '../auth/auth.guard'
import { ToastrService } from 'ngx-toastr';
import { identifierModuleUrl } from '@angular/compiler';

import { TenantandflatService } from '../shared/tenantandflat.service';
import { RequestService } from '../shared/request.service';
import { TenantListService } from '../shared/tenant-list.service';
import { VotingService } from '../shared/voting.service';
import { FlatService } from '../shared/flat.service';
import { AddTenantService } from '../shared/add-tenant.service';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  constructor(private http:HttpClient,private route:Router,public service:UserService,public service2:TenantandflatService,public service3:RequestService,public service4:TenantListService ,public canActivete:AuthGuard,public toastr:ToastrService,public votingService:VotingService,public flatService:FlatService,private addTenantService:AddTenantService) { }
  userDetails;
  counter;
  arrayCounter: Number[][]=[];
  isManagerOrComanager :boolean;
  userRoles=this.service.userRoles;
  ngOnInit() {


    var payLoad =JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    //this.toastr.info(payLoad.role);

   this.checkManagerOrCoManager();
   // this.toastr.success();

    this.addTenantService.getBuildings();


    this.service2.getFlatsOfTenant();
    this.service2.getBuildingsOfTenant();
    this.service2.getBuildingsOfTenantAsManagerOrCoManager();
    this.votingService.getAllowedReqsNo().subscribe(
      (res:any)=> this.counter =res,
    ),

    err=>console.log(err)

    this.votingService.getAllowedReqs_No_ArrayCount().subscribe(
      (res:any)=>this.arrayCounter = res,

    ),
    err=>console.log(err)

  }

  onLogout()
  {
    localStorage.removeItem("token");
    this.route.navigate(['/user/login']);

  }
  checkManager():boolean
  {
     var isManager = false;
      var payLoad =JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      //this.toastr.info(payLoad.role);
      payLoad.role.forEach(element => {
        if(element == 'Manager')
        {
          isManager = true;
        }
      });

    return isManager;

  }
  checkBikar()
  {
    var isBikar=false;
    this.userRoles.forEach(element=>
      {
        if(element=="Bikar")
        {
          isBikar=true;
        }
      });
      return isBikar;
  }
  checkManagerOrCoManager()
  {

     this.http.get("https://localhost:44396/api/Buildings/IsManagerOrCoManager").subscribe(
      (res:any)=>{
        this.isManagerOrComanager = res.isManagerOrComanager as boolean;
        console.log(res);
      }
    );


  }

}
