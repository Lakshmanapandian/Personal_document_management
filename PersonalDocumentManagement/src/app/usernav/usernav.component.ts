import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-usernav',
  templateUrl: './usernav.component.html',
  styleUrls: ['./usernav.component.css']
})
export class UsernavComponent implements OnInit {

  constructor(private api:ApiServiceService) {  console.log("constructor Runs");}

  ngOnInit(): void {
    console.log("ngOnInit Runs");
  }
  sessiondestoy(){
    localStorage.removeItem('login');
    this.api.show();
  }

}
