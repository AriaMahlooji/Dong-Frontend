import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Statistic } from './statistic.model';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {
  readonly url='https://localhost:44396/api';
  constructor(private http:HttpClient) { }
  amar=new Statistic();
  getsta()
  {
    this.http.get(this.url+"/Statistics").subscribe(
      (res:Statistic)=>{
        this.amar=res as Statistic;
       // console.log(this.amar);
       // console.log(res);
      }
    );
  }
}
