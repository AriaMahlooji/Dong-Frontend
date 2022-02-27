import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup, PatternValidator } from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly url='https://localhost:44396/api';
  constructor(private fb:FormBuilder,private http:HttpClient,private toastr :ToastrService) { }
 userRoles=[]=[];

  formModel =this.fb.group(
    {

      Username:['',Validators.required],
      Email:['',[Validators.required,Validators.email]],
      Fullname:[''],
      SSN:['',[Validators.required,Validators.pattern("[0-9]+")]],
      Passwords : this.fb.group(
        {
          Password :['',[Validators.minLength(8),Validators.required,]],
          ConfirmPassword :['',[Validators.required]]
        },{validator : this.comparePasswords}
      ),
      Phonenumber:['',[Validators.required,Validators.pattern("^(09)[0-9]{9}")]]
    }
  )
    comparePasswords(fb:FormGroup)
    {
      let ConfPswrd = fb.get('ConfirmPassword');
      if(ConfPswrd.errors == null||'PasswordMismatch' in ConfPswrd.errors)
      {
          if(fb.get('Password').value != fb.get('ConfirmPassword').value)
          {
            ConfPswrd.setErrors({PasswordMismatch:true});
          }
          else
            ConfPswrd.setErrors(null);
      }
    }
    checkPhonenumber(fb:FormGroup)
    {
      let castedPhonenumber = fb.get('Phonenumber');

    }

    managerRegister()
    {
      var body={
        Username : this.formModel.value.Username,
        Email : this.formModel.value.Email,
        Phonenumber :this.formModel.value.Phonenumber,
        Password : this.formModel.value.Passwords.Password,
        Fullname :this.formModel.value.Fullname,
        SSN:this.formModel.value.SSN
      }
      return this.http.post(this.url+'/ApplicationUser/Register',body);
    }

    login(formData)
    {
      return this.http.post(this.url+ '/ApplicationUser/Login',formData);
    }

  getUserProfile()
  {
   return this.http.get(this.url+'/UserProfile');
  }

  roleMatch(allowedRoles):boolean
  {
    //this.toastr.show("khoond");
    var isMatch=false;
    var payLoad =JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    payLoad.role.forEach(element => {
      if(element!="Bikar")
      {
       // this.userRoles.push(element);
      }
    });
    var userRoles=payLoad.role;
    //this.toastr.show(userRoles);
    userRoles.forEach(element => {
      allowedRoles.forEach(element1 => {
        if(element==element1)
        {
          isMatch=true;
    //this.toastr.show("khoond");

        }
      });

    });
    return isMatch;
  }

}
