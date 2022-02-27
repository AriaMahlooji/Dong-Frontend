import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import {ToastrService} from 'ngx-toastr';
 


@Component({
  selector: 'app-manager-registration',
  templateUrl: './manager-registration.component.html',
  styles: []
})
export class ManagerRegistrationComponent implements OnInit {

  constructor(public service:UserService,private toastr:ToastrService  ) { }

  ngOnInit() {
  }

  onSubmit()
  {
    this.service.managerRegister().subscribe(
      (res:any)=>{
        if(res.succeeded)
        {
          this.service.formModel.reset();
          this.toastr.success("Registered Successfully","User Registration");
          this.toastr.info("Email was Sent ");
         // this.toastr.info("Message Is Sent");
        }
        else
        {
          res.errors.forEach(element => {
            switch (element.code) {
              case "DuplicateUserName":
                console.log(element)
          this.toastr.error(element.description,"Registration Failed");                
                break;
            
            default:
          this.toastr.error(element.description,"Registration Failed");                

                break;
            }
          });
        }

      },
      err=>
      {
        console.log(err);
      }
    );
    
  }  
}
