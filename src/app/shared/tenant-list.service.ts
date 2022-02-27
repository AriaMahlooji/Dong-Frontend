import { Injectable } from '@angular/core';
import { Tenant } from './tenant.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TenantListComponent } from '../tenant-list/tenant-list.component';
import { Toast, ToastrComponentlessModule, ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class TenantListService {
  readonly url='https://localhost:44396/api';

  tenants:Tenant[]=[];
  tempTenantsList:Tenant[]=[];
  onlyActiveTenantsReq:boolean;
  constructor(private http:HttpClient ,private route:Router,private toastr:ToastrService) {
    this.onlyActiveTenantsReq = false;
   }


  getTenantsOfBuilding(id)
  {
   
    this.http.get(this.url+"/Buildings/TenantOfBuilding/"+id).subscribe(
      (res:any)=>{
        this.tenants=res as Tenant[];
        this.tempTenantsList = this.tenants;
      },
      err=>{
        console.log(err);
      }
    );
    this.route.navigate(['/tenant-list']);
  }
  onlyActiveTenants()
     {
        this.onlyActiveTenantsReq = ! this.onlyActiveTenantsReq;
        
        if(this.onlyActiveTenantsReq)
        {
            this.tempTenantsList= this.tempTenantsList.filter(m=> m.isActive == true);
        }
        else
        {
          this.tempTenantsList = this.tenants;
        }
     }


}
