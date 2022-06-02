import { Component, OnInit,ElementRef } from '@angular/core';
  import { FormBuilder, FormControl,FormGroup,Validators,NgForm } from '@angular/forms';
import { ApiServiceService } from '../api-service.service';
import { ToastrService } from 'ngx-toastr';
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
  constructor(private formbuilder:FormBuilder,private api:ApiServiceService,private el:ElementRef,private toastrService: ToastrService) {
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
    this.getalluser()
  }
  checkduplicateuser(event:any){
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
    let usernamecheck = (event.target.value);
    // let flag=0;
    for(const i  of this.object){
      if(i.username ==  usernamecheck){
        alert("username already taken");  
        // this.el.nativeElement.querySelector('#username').focus();

      }
    }

  }
  checkduplicateEmail(event:any){
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
    let emailcheck = (event.target.value);
    for(const i  of this.object){
      if(i.email ==  emailcheck){
        alert("email already taken");  
        // emailcheck.focus(event.target.value);
      }
    }
  }
  storeform(Formvalue:NgForm){
    console.log(Formvalue);
    this.sucess = 'sucessfully added';

    this.api.logindata(Formvalue).subscribe((data: any)=>{
      console.log(data);
    });
  }
  getalluser(){
    
  }
  function1(msg:any){
    this.toastrService.error(msg);
  }
}

