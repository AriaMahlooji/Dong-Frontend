import { Injectable } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { AddBuilding } from './add-building.model';





@Injectable({
  providedIn: 'root'
})
export class AddBuildingService {
  readonly url='https://localhost:44396/api';
  
  constructor(private http:HttpClient,private fb:FormBuilder) { }
  
  formModel =this.fb.group({
    Postalcode :[''],
    Name :[''],
    City :[''],
    Street:[''],
    More:[''],
    MonthlyCharge:[]
  });

  AddBuilding()
  {
    var body ={
      Postalcode : this.formModel.value.Postalcode,
      Name :this.formModel.value.Name,
      City:this.formModel.value.City,
      Street:this.formModel.value.Street,
      More:this.formModel.value.More,
      MonthlyCharge:this.formModel.value.MonthlyCharge
    }
    return this.http.post(this.url+'/Buildings',body);
  }

}
