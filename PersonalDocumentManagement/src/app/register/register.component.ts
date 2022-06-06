import { Component, OnInit,ElementRef } from '@angular/core';
  import { FormBuilder, FormControl,FormGroup,Validators,NgForm } from '@angular/forms';
import { ApiServiceService } from '../api-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  value:boolean=true;
  signup!:FormGroup;
  sucess:any=' ';
  alldata :any =[];
  object :any = [];
  alert=false;
  constructor(private formbuilder:FormBuilder,private api:ApiServiceService,private el:ElementRef,private toastrService: ToastrService,private router:Router) {
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
    this.getalluser();
  }
  checkduplicateuser(event:any){
       let usernamecheck = (event.target.value);
    // let flag=0;
    for(const i  of this.object){
      if(i.username ==  usernamecheck){
        this.toastrService.error("username already taken");  
        this.signup.reset();
        this.el.nativeElement.querySelector('#username').focus();

      }
    }

  }
  checkduplicateEmail(event:any){
    let emailcheck = (event.target.value);
    for(const i  of this.object){
      if(i.email ==  emailcheck){
        this.toastrService.error("email already taken");  
        // emailcheck.focus(event.target.value);
      }
    }
  }
  storeform(Formvalue:NgForm){
    console.log(Formvalue);

    this.api.logindata(Formvalue).subscribe((data: any)=>{
      console.log(data);
    });
    this.toastrService.success("successfully added")
    this.router.navigate(["/menu/login"]);
  }
  getalluser(){
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
  function1(msg:any){
    this.toastrService.error(msg);
  }
}

