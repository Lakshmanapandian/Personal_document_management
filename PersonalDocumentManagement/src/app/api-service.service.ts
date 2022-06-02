import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { reverse } from 'dns';
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
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
    var obj={
      username:username,
    }
    console.log(obj.username);
     return this.http.post('http://localhost:8000/username',obj);
  }
  getuserfiles(username:any){
    var obj={
      username:username,
    }
    console.log(obj);
    return this.http.post('http://localhost:8000/userfiles',obj);
  }
  uploadFiles(formdata:any,user_id:any){
    var obj = {
      userid:user_id,
      formdata:formdata,
    }
    console.log(obj);
    return this.http.post('http://localhost:8000/single',obj);
  }
  download(path:any,filename:any){
    var obj={
      filepath :path,
      filename :filename
    }
    return this.http.post('http://localhost:8000/download',obj,{responseType:'blob'});
  }
  localdelete(path:any,filename:any){
    var obj={
      filepath :path,
      filename :filename
    }
    return this.http.post('http://localhost:8000/localdelete',obj);
  }
  rename(oldpath:any,newpath:any){
    var obj = {
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
}
