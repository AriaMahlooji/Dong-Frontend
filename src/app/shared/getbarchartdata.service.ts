import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class GetbarchartdataService {
  readonly url='https://localhost:44396/api';
  barChartData : Number[]=[];
  constructor(private http:HttpClient,private toastr:ToastrService,private route:Router) {

   }

  getBarChartData()
  {
     return this.http.get(this.url+'/Statistics/GetBarChartData')   
  }
  getDoughnutChartData()
  {
    return this.http.get(this.url+'/Statistics/GetDoughnutChartData')
  }


}
