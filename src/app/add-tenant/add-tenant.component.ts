import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddTenantService } from '../shared/add-tenant.service';
import { ToastrService } from 'ngx-toastr';
import { building } from "../shared/building.model";
import { Tenantinvitation } from "../shared/tenantinvitation.model";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-tenant',
  templateUrl: './add-tenant.component.html',
  styles: []
})
export class AddTenantComponent implements OnInit {
 
  constructor(private route:Router,public service:AddTenantService,private toastr:ToastrService) { }
  
  ngOnInit() {
    this.service.getBuildings();
  
    if(this.service.list==null)
    {
      //this.toastr.error("List is Empty");
    }
    else
    {
     // this.toastr.success("List is Filled");
    }
    console.log(this.service.list)
  }
  onSubmit()
  {
    this.service.addTemporary().subscribe(
      (res:any)=>
      {
        this.service.formModel.reset();
        this.toastr.success("Tenant was Invited Successfully","Tenant Invite");
      },
      err=>{
        if(err.status == 433)
        {
          this.toastr.error("There is already an active Tenant with this unitNumber");
        }
      }
      
    )
    // this.service.addTemporary().subscribe(
    //   (res:any)=>{
    //     this.service.formModel.reset();
    //     this.toastr.success("Tenant was Invited Successfully","Tenant Invite");
    //   }
    // );
  }


}
