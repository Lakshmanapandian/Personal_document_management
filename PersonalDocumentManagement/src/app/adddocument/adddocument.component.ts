import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators,NgForm, FormsModule,} from '@angular/forms';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-adddocument',
  templateUrl: './adddocument.component.html',
  styleUrls: ['./adddocument.component.css']
})
export class AdddocumentComponent implements OnInit {
  constructor(private formbuilder:FormBuilder,private el: ElementRef,private http:HttpClient,private api:ApiServiceService) { }
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
        // this.filenames.push(i.file_name);
    } 
       });  
      console.log(this.files);
  }
  storeFiles(Formvalue:NgForm){

    console.log(Formvalue);
  }
  checkduplicate(){
    let id:any = localStorage.getItem('username');
    // console.log(JSON.parse(id))
    let user_id = JSON.parse(id);
    this.api.getuserfiles(user_id).subscribe((data:any)=>{  
      this.allfiles = data;
      this.allfiles =this.allfiles.docs;
      // console.log(this.allfiles);
      for(const i of this.allfiles){
        this.files.push(i);
         
    } 

       });  

      //  console.log(this.files)
    let inputEl: HTMLInputElement =  this.el.nativeElement.querySelector('#document');
    if(!inputEl || !inputEl.files){
      console.log('NULL');
      return ;
    }
   let  filename = inputEl.files[0].name;
  //  console.log(filename);
   for(const i  of this.files){
    if(i.file_name ==  filename){
      alert("File already Uploaded");  
      this.upload.reset();
      // this.el.nativeElement.querySelector('#username').focus();

    }
  }
}
    submit() {
  console.log(this.user_id);

      let inputEl: HTMLInputElement =  this.el.nativeElement.querySelector('#document');
      if(!inputEl || !inputEl.files){
        console.log('NULL');
        return ;
      }
      console.log(inputEl.files);
      let fileCount = inputEl.files?.length;
      let formData = new FormData();
      if (fileCount > 0) { // a file was selected
          for (let i = 0; i < fileCount; i++) {
              formData.append('image', inputEl.files[i]);
          }
             
            // headers.append('Accept', 'application/json');
              this.http.post('http://localhost:8000/single', formData).subscribe(
                  data => console.log(data),
                  error => console.log(error)
          );
  
      }
      this.notify = "file upload sucessfully"
      setTimeout(function(){
        window.location.reload();
      }, 1000);
    }
  addfunction(){
    this.add = !this.add;
  }
}
