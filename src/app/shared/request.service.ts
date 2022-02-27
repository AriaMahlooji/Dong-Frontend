import { Injectable } from '@angular/core';
import { building } from "../shared/building.model";
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup, PatternValidator } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {Request  } from "../shared/request.model";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RequestService{
  readonly url='https://localhost:44396/api';
  list:building[]=[];
  buildingsOfThisUser:building[]=[];
  reqlist:Request[]=[];
  constructor(private http:HttpClient,private fb:FormBuilder,private toastr:ToastrService,private route:Router) { }

  formModel=this.fb.group({
    BuildingId:['',Validators.required],
    IsPrivate:false,
    Abstract:['',Validators.required],
    Context:['',Validators.required],
    Price:['',[Validators.required,Validators.pattern("^[1-9][0-9]*")]],
    DeadLine:['',[Validators.required,Validators.pattern("^(36[0-6]|3[0-5][0-9]|[1-2][0-9][0-9]|[1-9][0-9]?)$")]]
  });

  getBuildings()
  {
    this.toastr.toastrConfig.positionClass = 'toast-center-center'
    // this.toastr.success("bbin vasat hast yana?");
     return this.http.get(this.url+'/Buildings/GetBuildings')
     .toPromise()
     .then(res =>
      {
      this.list = res as building[];
      });
  }

    sendRequest(isPrivate:Boolean)
    {
      var body ={
        BuildingId:this.formModel.value.BuildingId,
        IsPrivate:isPrivate,
        Abstract:this.formModel.value.Abstract,
        Context:this.formModel.value.Context,
        Price:this.formModel.value.Price,
        DeadLine:this.formModel.value.DeadLine
      }
      return this.http.post(this.url+'/Request',body);
    }
    getBuildingRequests(Id)
    {
     // this.toastr.info(Id);

      //this.toastr.info("Mano ejra kard");
       this.http.get(this.url+'/Request/BuildingReqList/'+Id).subscribe(
        (res:any)=>
        {
          this.reqlist=res as Request[];
          console.log(res);
          console.log(this.reqlist);
          //this.toastr.info(this.reqlist[0].BuildingId.toString());
         // this.toastr.info(this.reqlist[1].BuildingId.toString());
        }

      );


      this.route.navigate(['/voting']);
    }
    getBuildingsOfUser(Id)
    {
      this.http.get(this.url+'/FlatAndTenant/'+Id).subscribe(
        (res:any)=>
        {
            this.buildingsOfThisUser = res as building[];
        }
      )
    }

}
