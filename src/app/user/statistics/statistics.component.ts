import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styles: []
})
export class StatisticsComponent implements OnInit {
  readonly url='https://localhost:44396/api';
  
  //barChart
  public barChartOptions = {
    scaleShowVerticalLines : false,
    responsive :true
  };
  public barChartLabels = ['Buildings','Tenants','ExpiredTenants','Flats','Votes'];
  public barChartType = 'bar';
  public barChartLegend = 'true';
  public barChartData = [];
  

  //doughnutChart
  public doughnutChartLabels = ['Agree Votes','Disagree Votes'];
  public doughnutChartData =[];
  public doughnutChartType = 'doughnut';
  constructor(private http: HttpClient, private toastr:ToastrService) { }

  ngOnInit() {
    
   
    this.http.get(this.url+"/Statistics/GetBarChartData").subscribe(
      (res:any)=> (this.barChartData = [{data:[res[0],res[1],res[2],res[3],res[4]], label:'Overal Statistics'}]
       
      )
      
    )
    this.http.get(this.url+"/Statistics/GetDoughnutChartData").subscribe(
      (res:any)=>this.doughnutChartData = [res[0],res[1]]
    )
  }
  

}
