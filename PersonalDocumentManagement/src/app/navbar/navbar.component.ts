import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(public api:ApiServiceService) { 
    console.log("Constuctor works");
  }

  ngOnInit(): void {
    console.log("ngOnInit works");
  }
  isloggedin(){
    return localStorage.getItem('login');
  }
}
