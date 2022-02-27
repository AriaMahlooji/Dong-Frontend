import { Component, OnInit } from '@angular/core';
import { RequestService } from '../shared/request.service';
import { ToastrService } from 'ngx-toastr';
import { VotingService } from '../shared/voting.service';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styles:[]
})
export class VotingComponent implements OnInit {

  constructor(public service:RequestService,private toastr:ToastrService,public service2:VotingService) { }

  ngOnInit() {
   // console.log(this.service.reqlist);
   
   this.toastr.toastrConfig.positionClass='toast-center-center';
  
  }
  getContext(context)
  {
    
    this.toastr.info(context);
  }
  gettTime(ex:Date):boolean
  {
    let exp :Date = new Date(ex);
    let now :Date = new Date(Date.now());
    var diff =exp.getTime()-now.getTime();
    var days=diff/86400000;
    days=Math.floor(days);
    diff=diff-days*86400000;
    var diffhours=diff/3600000;
    diffhours=Math.floor(diffhours);
    diff=diff-diffhours*3600000;
    var diffminutes=diff/60000;
    diffminutes=Math.floor(diffminutes);
    if(days<0||diffhours<0||diff<0)
    {
      
      this.toastr.error("The Deadline Has Passed");
      return false;
    }
    else{
      this.toastr.info(days.toLocaleString()+"Days ,"+diffhours.toLocaleString()+"Hours ,"+diffminutes.toLocaleString()+"Minutes Remained");
      return true;
    }
    
   //this.toastr.success(diff.toLocaleString());
    //this.toastr.info(s.toLocaleString());
   //this.toastr.success(DDD.toLocaleString()+"Days ,"+hhh.toLocaleString()+"Hours ,"+MMM.toLocaleString()+"Minutes ,"+sss.toLocaleString()+"Seconds");
    
    
  }
  isAllowed(exp)
  {
    let expp :Date = new Date(exp);
    let now :Date = new Date(Date.now());
    if(now<expp)
    {
      return true;
    }
    else
    {
      return false;
    }
  }
 

}
