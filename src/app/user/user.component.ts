import { Component, OnInit } from '@angular/core';
import { StatisticService } from '../shared/statistic.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: []
})
export class UserComponent implements OnInit {

  constructor(private amarservice:StatisticService) { }

  ngOnInit() {
   
  }

}
