import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators,NgForm} from '@angular/forms';
import { ApiServiceService } from '../api-service.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-adddocument',
  templateUrl: './adddocument.component.html',
  styleUrls: ['./adddocument.component.css']
})
export class AdddocumentComponent implements OnInit {
  constructor(private formbuilder:FormBuilder,private el: ElementRef,private http:HttpClient,private api:ApiServiceService,private toaster:ToastrService) { }
upload!:FormGroup;
notify = '';
add = false;
 unparsed_id:any;
 user_id:any;
 allfiles:any = [];
 files:any=[];
  ngOnInit(): void {

    this.upload = this.formbuilder.group(
      {
        'title':['',Validators.required],
        'files':['',Validators.required],
      }
    )
    this.unparsed_id = localStorage.getItem('username');
    this.user_id = JSON.parse(this.unparsed_id);
    let id:any = localStorage.getItem('username');
    console.log(JSON.parse(id))
    let user_id = JSON.parse(id);
    this.api.getuserfiles(user_id).subscribe((data:any)=>{  
      this.allfiles = data;
      this.allfiles =this.allfiles.docs;
      console.log(this.allfiles);
      for(const i of this.allfiles){
        this.files.push(i);
    } 
       });  
      console.log(this.files);
  }
  storeFiles(Formvalue:NgForm){

    console.log(Formvalue);
  }
  checkduplicate(){
    let id:any = localStorage.getItem('username');
    let user_id = JSON.parse(id);
    this.api.getuserfiles(user_id).subscribe((data:any)=>{  
      this.allfiles = data;
      this.allfiles =this.allfiles.docs;
      for(const i of this.allfiles){
        this.files.push(i);
         
    } 

       });  
    let inputEl: HTMLInputElement =  this.el.nativeElement.querySelector('#document');
    if(!inputEl || !inputEl.files){
      console.log('NULL');
      return ;
    }
   let  filename = inputEl.files[0].name;
   for(const i  of this.files){
    if(i.file_name ==  filename){
      this.toaster.error("File already Uploaded");  
      this.upload.reset();
    }
  }
}
    submit() {
  

      let inputEl: HTMLInputElement =  this.el.nativeElement.querySelector('#document');
      if(!inputEl || !inputEl.files){
        console.log('NULL');
        return ;
      }
      console.log(inputEl.files);
      let fileCount = inputEl.files?.length;
      let formData = new FormData();
      if (fileCount > 0) {  
          for (let i = 0; i < fileCount; i++) {
              formData.append('image', inputEl.files[i]);
          }
           this.api.uploadFiles(formData).subscribe((data:any)=>{
             console.log(data);
           })
         
  
      }
      this.toaster.success( "file upload sucessfully");
      // setTimeout(function(){
      //   window.location.reload();
      // }, 1000);
    }
  addfunction(){
    this.add = !this.add;
  }
}
