import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DataService{

     url = "http://localhost:3000/api"

      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'my-auth-token'
        })
      };
    constructor(private http: HttpClient){
        
    }

    getAll(){
        console.log("Działa");
        return this.http.get(this.url + '/posts');     
    }

    getPost(postId){
        return this.http.get(`${this.url}/posts/${postId}`)
    }

    createPost(data){
        return this.http.post(`http://localhost:3000/api/post`,{data: JSON.stringify(data)},{headers: this.httpOptions.headers});
    }
}