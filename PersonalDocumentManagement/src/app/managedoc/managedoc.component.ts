import { Component, OnInit, ElementRef } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import{saveAs} from 'file-saver'; 
import { FormBuilder,FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-managedoc',
  templateUrl: './managedoc.component.html',
  styleUrls: ['./managedoc.component.css']
})
export class ManagedocComponent implements OnInit {
  user_id:any;
  allfiles:any=[];
files:any=[]; 
renamediv = false;
 rename!:FormGroup;
  constructor( private api:ApiServiceService,private formbuilder:FormBuilder,private el: ElementRef) { 
  }
ngOnInit(): void {
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
 
      this.rename = this.formbuilder.group(
        {
          'files':['',Validators.required],
        }
        )
}

download(filepath:any,filename:any){
  this.api.download(filepath,filename).subscribe((data:any)=>{
    saveAs(data, filename)
  });
}
delete(doc_Id:any,doc_rev:any)
{
  this.api.remove(doc_Id,doc_rev).subscribe(res=>{
    console.log('Your data was Deleted from the database');
    console.log(res);
    window.alert('sucessfully deleted');
    location.reload();
  })
}
localDelete(filepath:any,filename:any){
  this.api.localdelete(filepath,filename).subscribe((data:any)=>{
    console.log(data);
    console.log('Your data was Deleted from the Local directory');
    window.alert('sucessfully deleted');
  })
  
}
oldPath(object:any){
  localStorage.setItem('renameobj',JSON.stringify(object));

} 
renameLocal(filename:any){
  let oldobj:any = localStorage.getItem('renameobj');
  let parsedold :any = JSON.parse(oldobj);
  console.log(parsedold);
  let newpath = filename.files;  
this.api.rename(parsedold,newpath).subscribe((data:any)=>{
console.log(data);
});
setTimeout(function(){
  window.location.reload();
}, 10);
}
}

