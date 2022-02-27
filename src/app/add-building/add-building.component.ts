import { Component, OnInit } from '@angular/core';
import { AddBuildingService } from '../shared/add-building.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-building',
  templateUrl: './add-building.component.html',
  styles: []
})
export class AddBuildingComponent implements OnInit {

  constructor(public service:AddBuildingService,private toastr:ToastrService) { }

  ngOnInit() {
    this.service.formModel.reset();
  }

  onSubmit()
  {
    this.service.AddBuilding().subscribe(
        (res:any)=>{
      
        
          this.service.formModel.reset();
          this.toastr.success("Building was Added Successfully","Add Building Section");
          
        
      },
      err=>{console.log(err)}
      );
      
  }

}
