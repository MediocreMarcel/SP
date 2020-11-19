import {Injectable, NgModule} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})


export class CreateModuleService {

  constructor(private http: HttpClient) { }

  sendModuleToDB(postData: any, url: any){

    this.http.post(url, postData).subscribe((val) => {console.log("Post sucessful")});
    console.log(postData, url);
  }

}
