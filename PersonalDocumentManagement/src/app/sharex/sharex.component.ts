import { Component, OnInit ,ElementRef} from '@angular/core';
import { FormBuilder, FormGroup,Validators} from '@angular/forms';
import { ApiServiceService } from '../api-service.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-sharex',
  templateUrl: './sharex.component.html',
  styleUrls: ['./sharex.component.css']
})
export class SharexComponent implements OnInit {
  sharex!:FormGroup;
  alldata :any =[];
  object :any = [];
  flag:number = 0;
  receiver:any;
  constructor(private api:ApiServiceService,private formbuilder:FormBuilder,private toaster:ToastrService,private el:ElementRef) { console.log("empty constructor")}

  ngOnInit(): void {
    console.log(" ngOnInit");
    this.sharex = this.formbuilder.group(
      {
        'receiver':['',Validators.required],
        'files':['',Validators.required],
      }
    )
this.getalluser();
  }
  getalluser(){
    this.api.getUser().subscribe(data=>{
      console.log(data);
      console.log('Data was fetching');
      this.alldata=data;
      this.alldata=this.alldata.docs;
      console.log(this.alldata);
      for(const i of  this.alldata){
            this.object.push(i);
            console.log('Fetched successfuly');
      }
    })
  }
  checkReceiver(event:any){
    let receiverCheck = (event.target.value);
    for(const i  of this.object){
      if(i.username ==  receiverCheck){
        this.flag++; 
        this.receiver=i._id; 
  }
}
if(this.flag == 0){
  this.toaster.error('Receiver not found');
}
console.log(this.flag)
}
sharefile(){
  console.log(this.receiver);
  let inputEl: HTMLInputElement =  this.el.nativeElement.querySelector('#document');
  console.log(inputEl.files);
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
         this.api.sharefile(formData,this.receiver).subscribe((data)=>{
           console.log(data); 
         })

  }
}
}
