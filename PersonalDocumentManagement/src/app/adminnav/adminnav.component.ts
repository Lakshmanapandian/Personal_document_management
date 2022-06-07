import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminnav',
  templateUrl: './adminnav.component.html',
  styleUrls: ['./adminnav.component.css']
})
export class AdminnavComponent implements OnInit {

  constructor() { console.log("constructor run");}

  ngOnInit(): void {
    console.log("ngOnInit run");
  }

}
