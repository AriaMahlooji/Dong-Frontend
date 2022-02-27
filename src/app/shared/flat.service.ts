import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RouteConfigLoadEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FlatService {
  flatDescription
  readonly url='https://localhost:44396/api';
  constructor(private http : HttpClient,private route:Router) { }
  
  getThisFlat(Id:Number)
  {
    this.http.get(this.url+'/FlatAndTenant/GetFlat/'+Id).subscribe(
      (res:any)=>this.flatDescription=res
    ),
    err=>console.log(err)
    
    this.route.navigate(['/flatdesc'])
    
  }
}
