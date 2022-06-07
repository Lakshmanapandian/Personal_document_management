import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { FormGroup,FormBuilder ,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  userForm!:FormGroup;
  user:any;
  constructor(private api:ApiServiceService,private formbuilder:FormBuilder,private router:Router,private toastrService: ToastrService) { 
  }
  user_id:any=[];
alldata :any;
flag = 0;
notify= '';
object:any=[];
files:any=[]
  ngOnInit(): void {
    this.getallusers();
    this.userForm = this.formbuilder.group(
      {
        'username':['',Validators.required],
        'password':['',Validators.required],

      }
    );
  }
userFormData(formvalue:any){
  console.log(formvalue);
  for(const i  of this.object){
    if(i.username ==  formvalue.username && i.password == formvalue.password){
      localStorage.setItem('login',JSON.stringify(i));
      localStorage.setItem('username',JSON.stringify(i._id) );
        this.flag = 1;
        this.api.getusername(i._id).subscribe((data:any)=>{
          console.log(data);
        });
        this.api.getEmail(i.email).subscribe((data:any)=>{
          console.log("OTP");
          localStorage.setItem('OTP',JSON.stringify(data));
          console.log(data);
        });
    }
 }
  if(this.flag == 1 ){
    setTimeout(function(){
      console.log("");
    }, 10000);
    this.router.navigate(['/menu/welcomeadmin']);
  }
  else{
        this.toastrService.error("invalid user") ;
  }
 
}
getallusers(){
    this.api.getUser().subscribe(data=>{
      console.log(data);
      console.log('Data was fetching');
      this.alldata=data;
      console.log(this.alldata);
      this.alldata=this.alldata.docs;
      console.log(this.alldata);
      for(const i of this.alldata){
            this.object.push(i);
      }
      console.log('Fetched successfuly');

    });
}
}
