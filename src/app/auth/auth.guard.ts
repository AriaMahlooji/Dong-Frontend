import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { state } from '@angular/animations';
import { UserService } from '../shared/user.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

constructor(private route:Router,private service :UserService,private toastr:ToastrService) {
  
}
  canActivate(next :ActivatedRouteSnapshot,state: RouterStateSnapshot)
  :boolean{
   // this.toastr.show("Can Activate");

      if(localStorage.getItem('token')!=null)
      {
      //  this.toastr.show("OOmad Inja");
        let roles =next.data['permittedRoles'] as Array<string>;
      //  this.toastr.show("OOmad Inja 1");
        if(roles==null)
        {
          //this.toastr.error("Roles is empty");
        }
        if(roles!=null)
        {
        roles.forEach(element => {
      //    this.toastr.info(element);
        });

          if(this.service.roleMatch(roles)) return true;
          else if(this.service.roleMatch(roles)==false)
          {
           // this.toastr.error("injaham oomadammaa");
            this.route.navigate(['forbidden']); 
           // this.toastr.error("hatta injaham oomadammaa");
            return false;
          }
        }
        return true;
      }
      else{
        this.route.navigate(['/user/login']);
        return false;
        
      }
    }
  
  
}
