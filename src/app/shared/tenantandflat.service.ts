import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { building } from './building.model';
import {flat} from './flat.model'

@Injectable({
  providedIn: 'root'
})
export class TenantandflatService {
list:building[]=[];
mainRoleBuildings:building[]=[];
flatList:flat[]=[];



readonly url='https://localhost:44396/api';

  constructor(private http:HttpClient) { }

  //Get Buildings which the user is manager or co-Manager of them
  getBuildingsOfTenant()
  {
    return this.http.get(this.url+'/FlatandTenant/GetBuildingsOfTenant').subscribe(
      res=>{
        this.list=res as building[];
      },
      err=>{
        console.log(err);
      }
    );
  }
  getBuildingsOfTenantAsManagerOrCoManager()
  {
    return this.http.get(this.url+'/FlatandTenant/GetBuildingsOfTheUserAsManagerOrComanager').subscribe(
      res=>
      {
        this.mainRoleBuildings = res as building[];
      },
      err=>{
        console.log(err);
      }
    )
  }
  getFlatsOfTenant()
  {
    return this.http.get(this.url+'/FlatandTenant/GetFlatsOfTenant').subscribe(
      res=>{
        this.flatList = res as flat[];
        //console.log(res);
      },
      err=>{console.log(err);
    }
    );
    
  }
}
