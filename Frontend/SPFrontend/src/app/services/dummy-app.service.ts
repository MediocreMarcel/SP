import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DummyAppService {
  backendUrl = 'http://localhost:8080/rest/ping';

  constructor(private httpClient: HttpClient) {
  }


  public getUrl() {
    return this.httpClient.get(this.backendUrl,     {  responseType: 'text' }
    );
  }
}
