import { Component, OnInit } from '@angular/core';
import {Form, NgForm} from '@angular/forms'
import { UserService } from 'src/app/shared/user.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
formModel={
  UserName:'',
  Password:''

}
  constructor(private service :UserService,private route:Router,private toastr:ToastrService) { }

  ngOnInit() {
   
    if(localStorage.getItem('token')!=null)
    {
      this.route.navigate(['/home']);
    }
  }

  onSubmit(form:NgForm)
  {
    this.service.login(form.value).subscribe(
      
        (res:any)=>{
          localStorage.setItem("token",res.token);
          this.route.navigateByUrl('/home');
        },
        err=>{
            if(err.status == 501)//Incorrect pair of user and pass
          {
            this.toastr.error("Username Or Password Is Not Correct","Login Failed");
          }
            if(err.status == 507) //account is blocked
            {
              this.toastr.error("Your Accout is Temporarily Blocked Try again in "+err.error.waitPeriod+" minutes");
              
            }
            if(err.status == 508) // right now he lost his 5 chances
            {
              this.toastr.error("Due to repetitive failed login attempts, your account is blocked for 30 minutes");
            }
            if(err.status ==509 || err.status ==510) // incorrect password 
            {
              this.toastr.error("Incorrect Password. You have only "+(5-err.error.failedCounter)+" remained attempts");
            }
            
        }
      
    );
  }

}
