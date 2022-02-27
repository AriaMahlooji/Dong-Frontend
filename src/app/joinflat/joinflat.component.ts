import { Component, OnInit } from '@angular/core';
import { JoinflatService } from '../shared/joinflat.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-joinflat',
  templateUrl: './joinflat.component.html',
  styles: []
})
export class JoinflatComponent implements OnInit {

  constructor(public service:JoinflatService,private toastr:ToastrService) { }
  joinFlatForm:any={}
  ngOnInit() {
  }
  onSubmit()
  {
   
    this.service.tenantJoint().subscribe(
      (res:any)=>{
        this.service.formModel.reset(),
        this.toastr.success("Welcome, You hava successfully joined the flat");
      }
    
    ,
      err=>
      {
        if(err.status==418)
        {
          this.toastr.error("Registration Code Is Expired","Failed")
        }
        if(err.status==419)
        {
          this.toastr.error("Phonenumber Or Registration Code is not Valid","Failed")
        }
        console.log(err);
      }
    );
  }

}
