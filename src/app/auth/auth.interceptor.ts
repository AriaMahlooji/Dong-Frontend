import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

constructor(private route:Router,private toastr:ToastrService) {
        
}

    intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>>{
        if(localStorage.getItem("token")!=null)
        {

            const clonedReq=req.clone({
                headers :req.headers.set('Authorization','Bearer '+localStorage.getItem('token'))
            });
            return next.handle(clonedReq).pipe(
                tap(
                    succ =>{},
                    err=>{
                        if(err.status==401)
                        {
                            localStorage.removeItem('token');
                            this.route.navigateByUrl('/user/login');
                            this.toastr.error("Token Is Expired or Is Not Valid");                            
                        }
                        if(err.status==403)
                        {
                            this.route.navigate(['forbidden']);
                        }
                    }
                )
            )
        }
        else{
            return next.handle(req.clone());
        }
           
        
    } 
}