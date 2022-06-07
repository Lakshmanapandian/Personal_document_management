import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
nav:boolean=true;
hide:boolean=false;
  constructor(private  http:HttpClient) {
   }
   getfunction(){
   return this.http.get('http://localhost:8000/dashboard');
   }
   logindata(formvalue:any){
   return this.http.post('http://localhost:8000/dashboard',formvalue);
   }
   getUser(){
    return this.http.get('http://localhost:8000/getUser/');
  }
  getUserId(id:any){
    return this.http.get(`http://localhost:8000/getUserId/${id}`);
  }
  remove(id:any,id1:any){
    return this.http.delete(`http://localhost:8000/delete_items/${id}/${id1}`);
  }
  getAdmin(){
    return this.http.get('http://localhost:8000/getAdminId/');
  }
  getAdminId(id:any){
    return this.http.get(`http://localhost:8000/getAdminId/${id}`);
  }
  getusername(username:any)
  {
    let obj={
      username:username,
    }
    console.log(obj.username);
     return this.http.post('http://localhost:8000/username',obj);
  }
  getuserfiles(username:any){
    let obj={
      username:username,
    }
    console.log(obj);
    return this.http.post('http://localhost:8000/userfiles',obj);
  }
  uploadFiles(formdata:any){
    let headers = new HttpHeaders();
    let userId:any =localStorage.getItem("username"); 
    let parseuserId = JSON.parse(userId);
headers = headers.append('x-authname', parseuserId);
    return this.http.post('http://localhost:8000/single',formdata,{"headers":headers});
  }
  download(path:any,filename:any){
    let obj={
      filepath :path,
      filename :filename
    }
    return this.http.post('http://localhost:8000/download',obj,{responseType:'blob'});
  }
  localdelete(path:any,filename:any){
    let obj={
      filepath :path,
      filename :filename
    }
    return this.http.post('http://localhost:8000/localdelete',obj);
  }
  rename(oldpath:any,newpath:any){
    let obj = {
      oldfilename : oldpath.file_name,
      oldtype :oldpath.file_type,
      oldfilepath : oldpath.filepath,
      oldid : oldpath._id,
      oldrev : oldpath._rev,
      type : oldpath.type,
      newpath:newpath,
      olduserid:oldpath.user_id
    }
    console.log(obj);
    return this.http.post('http://localhost:8000/localrename',obj);
  }
  getEmail(email:any){
    let obj={
      emailId :email
    }
    return this.http.post('http://localhost:8000/sendemail',obj)
  }
  sharefile(formdata:any,receiver:any){

  let obj={
      file:formdata,
      receiverdetails:receiver
  }
  console.log(obj);
    return this.http.post('http://localhost:8000/share',obj)
  }
  show(){
    this.nav=false;
  }
  
}
