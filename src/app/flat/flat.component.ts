import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { flat } from '../shared/flat.model';
import { FlatService } from '../shared/flat.service';

@Component({
  selector: 'app-flat',
  templateUrl: './flat.component.html',
  styles: ['']
})
export class FlatComponent implements OnInit {
  
  constructor(private http:HttpClient,public flatService:FlatService) { }

  ngOnInit() {
      
  }
  
  

}
