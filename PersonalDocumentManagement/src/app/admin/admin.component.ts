import { Component, OnInit } from '@angular/core';
  import { FormBuilder,FormGroup,Validators} from '@angular/forms';
  import { ApiServiceService } from '../api-service.service';
  import { Router } from '@angular/router';
  import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  admindata:any;
  adminDetails:any=[];
  adminForm!: FormGroup;
  flag = 0;
  notify = '';
  constructor(private api:ApiServiceService,private formbuilder:FormBuilder,private route:Router,private toaster:ToastrService) { }

  ngOnInit(): void {
    this.api.getAdmin().subscribe((data)=>{
      console.log(data);
      this.admindata = data;
      this.admindata = this.admindata.docs;
     console.log(this.admindata);
     for(const i of this.admindata){
         this.adminDetails.push(i);
         console.log('admin data fetched sucessfully');
         console.log(this.adminDetails);
     }
    })
    this.adminForm = this.formbuilder.group(
      {
        'admin_name':['',Validators.required],
        'password':['',Validators.required],

      }
    );
  }
  adminFormsData(formvalue: any){
     for(const i  of this.adminDetails){
        if(i.admin_name ==  formvalue.admin_name && i.password == formvalue.password){
            this.flag = 1;
        }
     }
      if(this.flag == 1 ){
        this.route.navigate(['/admindashboard']); 
      }
      else{
         this.toaster.error("Bad Credentials","invalid user")
      }
  }
}
