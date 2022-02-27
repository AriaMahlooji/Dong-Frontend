import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import {building} from "./building.model";
import { ToastrService } from 'ngx-toastr';
import {Tenantinvitation} from '../shared/tenantinvitation.model'
@Injectable({
  providedIn: 'root'
})
export class AddTenantService {
  tenantInvitation:Tenantinvitation;
  list:building[]=[];
  readonly url='https://localhost:44396/api';
 constructor(private http:HttpClient,private fb:FormBuilder,private toastr:ToastrService) { }
formModel=this.fb.group({
  BuildingId:[''],
  FlatId:[''],
  UnitName:[''],
  Phonenumber:[''],
  Fullname:[''],
  FloorNumber:[],
  UnitNumber:[],
  Email:[]
})
  
  addTemporary()
  { 
    var body={

      BuildingId : this.formModel.value.BuildingId,
      Phonenumber :this.formModel.value.Phonenumber,
      Fullname :this.formModel.value.Fullname,
      FloorNumber:this.formModel.value.FloorNumber,
      UnitNumber:this.formModel.value.UnitNumber,
      Email:this.formModel.value.Email,
      UnitName:this.formModel.value.UnitName

    }
    return this.http.post(this.url+'/TenantTeporaryInvitations',body);
  }

  //The buildings that the user is manager or comanager of them
  getBuildings()
  {
    //this.toastr.success("OOmadam");
     return this.http.get(this.url+'/Buildings/GetBuildings')
     .toPromise()
     .then(res => this.list = res as building[]);   
  }
  inviteTenant(){
     return this.http.post(this.url+'/TenantTeporaryInvitations',this.tenantInvitation);
  }
}
