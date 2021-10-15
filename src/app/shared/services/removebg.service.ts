import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RemovebgService {
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('X-Api-Key', 'PEVWR2sQc4rYfC8ESbTJucte');
    this.headers = this.headers.set('Pragma', 'no-cache');
   }

  public async removeBackground(file: File){
   
    var myHeaders = new Headers();
    myHeaders.append("X-Api-Key", "PEVWR2sQc4rYfC8ESbTJucte");

    var formdata = new FormData();
    formdata.append("image_file", file, "/C:/Users/adria/Downloads/firmaElvis2.jpeg");

    let response = await  this.http.post<any>("https://api.remove.bg/v1.0/removebg?size='auto'",formdata,{headers:this.headers});
    return response;
  }
}
