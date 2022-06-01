import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
alldata :any;
// user =  true;
object:any=[];
usertable = false;
  constructor( private api:ApiServiceService) { }

  ngOnInit(): void {
  }
  getuser(){
   this.usertable = !this.usertable;
    this.api.getUser().subscribe(data=>{
      console.log(data);
      console.log('Data was fetching');
      this.alldata=data;
      this.alldata=this.alldata.docs;
      console.log(this.alldata);
      for(const i of  this.alldata){
          // const elt = this.alldata[i];
          // console.log(elt.id);
          // this.api.getUserId(elt.id).subscribe(res=>{
            // console.log(res);
            this.object.push(i);
            console.log('Fetched successfuly');
          // })
      }
    })
  }
  deleteuser(data:any,data1:any){
    this.api.remove(data._id,data1._rev).subscribe(res=>{
      console.log('Your data was Deleted from the database');
      // this.user = false;
      window.alert('sucessfully deleted');
      location.reload();
    })
     }
}

