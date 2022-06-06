import { importType } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-welcomeadmin',
  templateUrl: './welcomeadmin.component.html',
  styleUrls: ['./welcomeadmin.component.css']
})
export class WelcomeadminComponent implements OnInit {
OTP:any;
otpForm!:FormGroup;
  constructor(private formbuilder:FormBuilder,private toaster:ToastrService,private router:Router) { }

  ngOnInit(): void {
    this.otpForm = this.formbuilder.group(
      {
        'otp':['',Validators.required],
        

      }
    );
   
    this.OTP = localStorage.getItem('OTP');
    console.log(this.OTP);
  }
  reloadpage(){
    
    window.stop();
  }
  checkotp(otp:any){
    console.log(otp.otp);
    console.log( this.OTP);

     if(this.OTP == otp.otp) {
      this.toaster.success("otp is correct");
      this.router.navigate(['/menu/adddocument'])

    // localStorage.removeItem('OTP');

     }
     else{
       this.toaster.error("otp is incorrect");

     }
  }
  }
 


