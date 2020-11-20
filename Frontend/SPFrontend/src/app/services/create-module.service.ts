import {Injectable, NgModule} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})


export class CreateModuleService {
  postDataJSON: object;

  constructor(private http: HttpClient) { }

  sendModuleToDB(postData: any[], url: any){
    this.postDataJSON = {"module_id":"1235", "course": postData[0], "definition": postData[1]};

    this.http.post(url, this.postDataJSON).subscribe((val) => {console.log("Post sucessful")});
    console.log(postData, url);
  }

}
