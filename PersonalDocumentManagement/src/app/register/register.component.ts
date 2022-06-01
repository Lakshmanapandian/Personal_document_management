import { Component, OnInit } from '@angular/core';
  import { FormBuilder, FormControl,FormGroup,Validators,NgForm } from '@angular/forms';
import { ApiServiceService } from '../api-service.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  value:boolean=true;
  object = [];
  signup!:FormGroup;
  sucess:any=' ';
  constructor(private formbuilder:FormBuilder,private api:ApiServiceService) {
    // this.api.connecting().subscribe(data =>{
    //   console.log(data);
    // })
   }
 
  ngOnInit(): void {
    this.signup = this.formbuilder.group(
      {
        'username':['',Validators.required],
        'first_name':['',Validators.required],
        'last_name':['',Validators.required],
        'email':['',Validators.required],
        'password':['',Validators.required],
        'confirm_password':['',Validators.required],
      }
    )
  }
  
  storeform(Formvalue:NgForm){
    console.log(Formvalue);
    this.sucess = 'sucessfully added';
    this.api.logindata(Formvalue).subscribe((data: any)=>{
      console.log(data);
    });
  }
}

