import { Component, OnInit } from '@angular/core';
import {  AddTenantService} from "../shared/add-tenant.service";
import { RequestService } from '../shared/request.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styles:['']
})
export class RequestComponent implements OnInit {

  isPrivate:boolean
  reqModel:any={}
  constructor(public service:RequestService, private toastr:ToastrService) { }

  ngOnInit() {
    this.service.getBuildings();
  }

  onSubmit()
  {
    this.service.sendRequest(this.isPrivate).subscribe(
      (res:any)=>{
        this.service.formModel.reset();
        this.toastr.success("You'r Request Submitted Successfully")
      },
      err=>
      {
        console.log(err);
      }
    );
  }
  onIsPrivateChange(event:Event)
  {
    if((event.target as HTMLInputElement).checked)
    {
      this.isPrivate = true;
    }
    else
    {
      this.isPrivate = false;
    }
  }
}
