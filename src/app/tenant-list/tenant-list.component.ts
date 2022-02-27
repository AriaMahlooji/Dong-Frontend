import { Component, OnInit } from '@angular/core';
import { TenantListService } from '../shared/tenant-list.service';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BOOL_TYPE } from '@angular/compiler/src/output/output_ast';
import { ToastrService } from 'ngx-toastr';
import { RequestService } from '../shared/request.service';

@Component({
  selector: 'app-tenant-list',
  templateUrl: './tenant-list.component.html',
  styles: []
})
export class TenantListComponent implements OnInit {
  readonly url='https://localhost:44396/api';

  theBuildingId;

  theBuildingName;
  constructor(private route:Router, public service:TenantListService,private http:HttpClient,private toastr :ToastrService,public service4:TenantListService) { }
  tenantList=[];
  tempTenantList=[];
  ngOnInit() {


  }


    checkComanager(bid,cid):boolean
    {
       var result;
       this.http.get(this.url+"/Buildings/ComanagerOfBuilding/"+bid+"/"+cid).subscribe(
       (res:any)=>{
          if(res==true)
          {
            this.toastr.toastrConfig.positionClass='toast-center-center';
            this.toastr.info("Is Co-Manager");
          }
          if(res==false)
          {
            this.toastr.toastrConfig.positionClass='toast-center-center';
            this.toastr.info("Is not Co-Manager");
          }
          },
          err=>{console.log(err)}
       );

        return result;
     }

     checkManager(bid,mid)
     {
      var result2;
       return this.http.get(this.url + "/Buildings/IsManagerOfBuilding/"+bid+"/"+mid).subscribe(
         (res:any)=> result2 =res
       ),
       err=>console.log(err)
     }
     removeTenant(id,buildingId)
     {
       var body;
       this.http.post(this.url+"/FlatAndTenant/EXPDate/"+id,body).subscribe(
         (res:any)=>{
           this.toastr.toastrConfig.positionClass='toast-center-center'
           this.toastr.success("Teant Is Successfully Removed");
           this.service4.getTenantsOfBuilding(buildingId);
         },
         err=>{
           if(err.status == 518)
           {
           this.toastr.toastrConfig.positionClass='toast-center-center'

             this.toastr.error("Tanant is Manager of the Building :)");
           }
           if(err.status == 405)
           {
           this.toastr.toastrConfig.positionClass='toast-center-center'
           this.toastr.error("Only The Manager is able to remove tenants :)");

           }
           if(err.status == 519)
           {
            this.toastr.error("Tanant is CoManager of the Building :) \n If you really want to remove this tenant, you need to remove the Comanager role from It");
           }
           console.log(err);
         }
       );
     }
     addComanager(bid,tid,tFullname)
     {
      this.service.getTenantsOfBuilding(bid);
       var body={
        TenantId:tid,
        BuildingId:bid
       }
       this.http.post(this.url+"/comanagerandbuildings/Add",body).subscribe(
         (res:any)=>{
           this.toastr.toastrConfig.positionClass='toast-center-center';
           this.toastr.success(tFullname+ " Has Co-Manager Role now!");
           this.service4.getTenantsOfBuilding(bid);
         },
         err=>{
            if(err.status==501)
            {
              this.toastr.toastrConfig.positionClass='toast-center-center';
              this.toastr.error("Tenant is Already a Co-Manager");
            }
            if(err.status==405)
            {
              this.toastr.toastrConfig.positionClass='toast-center-center';
              this.toastr.error("Only Manager is allowed to do this action");
            }
         }

       );

     }
      removeComanager(bid,tid,tFullname)
     {
       var body={
        TenantId:tid,
        BuildingId:bid
       }
       this.http.post(this.url+"/comanagerandbuildings/Remove",body).subscribe(
         (res:any)=>{
           this.toastr.toastrConfig.positionClass='toast-center-center';
           this.toastr.success(tFullname+" is not comanager any more");
           this.service4.getTenantsOfBuilding(bid);
         },
         err=>{
           if(err.status==502)
           {
             this.toastr.toastrConfig.positionClass='toast-center-center';
             this.toastr.info("The Tenant is not Co-Manager");
           }
           if(err.status == 405)
           {
             this.toastr.toastrConfig.positionClass="toast-center-center";
             this.toastr.error("Only Manager is allowed to do this action");
           }
         }
       );
     }
     tenantHover()
     {
       this.toastr.success("bgiresh");
     }


}
