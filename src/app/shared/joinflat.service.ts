import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class JoinflatService {
  readonly url='https://localhost:44396/api';
  
  constructor(private http:HttpClient,private toastr :ToastrService,private fb:FormBuilder) { }

  formModel=this.fb.group({
    Phonenumber:[''],
    RegistrationCode:['']  
  })

  tenantJoint()
  {
    var body={  
      Phonenumber :this.formModel.value.Phonenumber,
      RegistrationCode:this.formModel.value.RegistrationCode
    }
    return this.http.post(this.url+'/FlatAndTenant',body);
  }

}
