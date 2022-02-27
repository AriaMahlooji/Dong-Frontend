import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Names } from "../shared/names.model";
import { RequestService } from './request.service';


@Injectable({
  providedIn: 'root'
})
export class VotingService {
  readonly url='https://localhost:44396/api';
 names:Names[]=[];
  constructor(private http :HttpClient,private fb:FormBuilder,private toastr:ToastrService,private route:Router,private service3:RequestService) { }
  formModel=this.fb.group({
    ReqId:[],
    Vote:false,
  })

submitAgree(id,bid)
{
  var body={
    RequestId:id,
    Vote:true
  }
   this.http.post(this.url+"/Votings",body).subscribe(
     (res:any)=>{

         this.toastr.success("Your Vote Is Submitted Successfully")
         this.service3.getBuildingRequests(bid);

     }
     ,err=>{
       if(err.status==418)
       {
         this.toastr.error("You Can Submit Just One Vote For Every Request");
       }
       if(err.status==419)
       {
        this.toastr.error("The Deadline Has Passed");

       }
     }
   );


   //this.route.navigate(['/voting']);



}
submitDisagree(id,bid)
{
  var body={
    RequestId:id,
    Vote:false
  }
   this.http.post(this.url+"/Votings",body).subscribe(
     (res:any)=>{

        this.toastr.success("Your Vote Is Submitted Successfully")
        this.service3.getBuildingRequests(bid);


     },
     err=>{
      if(err.status==418)
      {
        this.toastr.error("You Can Submit Just One Vote For Every Request");
      }
      if(err.status==419)
      {
       this.toastr.error("The Deadline Has Passed");

      }
     }
   );
   this.service3.getBuildingRequests(bid);

}
getPositives(id)
{

  this.http.get(this.url+'/Request/ReqResults/'+id).subscribe(
    (res:any)=>{



    this.toastr.info(res,"Tenats With Agree Votes:");
    },
    err=>{
      if(err.status==518)
      {
        this.toastr.error("You are not allowed to see the Voters' names of a Private request","Access Denied!");
      }
    }
  );
}
getNegatives(id)
{
  id=-id;
  this.http.get(this.url+'/Request/ReqResults/'+id).subscribe(
    (res:any)=>{

      this.toastr.info(res,"Tenants With Disagree Votes:");
    },
    err=>{
      if(err.status==518)
      {
        this.toastr.error("You are not allowed to see the Voters' names of a Private request");
      }
    }
  );
}
getAllowedReqsNo()
{
  return this.http.get(this.url+'/Votings/GetAllAvailableVotingsCount')
}
getAllowedReqs_No_ArrayCount()
{
    return this.http.get(this.url+'/Votings/GetAllAvailabelVotingsArrayCount')
}
isAllowed(id):boolean
{
  this.http.get(this.url+"/Votings/IsAllowed/"+id).subscribe(
    (res:any)=>
    {
      if(res.status==200)
      {
        return true;
      }
    },
    err=>{
      if(err.status==501 || err.status==502)
      {
        return false;
      }
    }
  );
  return true;
}

}
