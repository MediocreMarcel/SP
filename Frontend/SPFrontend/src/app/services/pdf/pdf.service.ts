import {Injectable} from '@angular/core';
import {SaveExamAndQuestionsDTO} from "../../components/models/SaveExamAndQuestionsDTO";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  url = environment.BaseUrl;


  constructor(private http: HttpClient) {
  }

  /**
   *
   * @param postData
   *
   */
  previewPDF(postData: SaveExamAndQuestionsDTO) {
    let headerOptions = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/pdf'
    });

    let requestOptions = {headers: headerOptions, responseType: 'blob' as 'blob'};

    return this.http.post(this.url + 'generatePdf/pdfPreview', JSON.stringify(postData), requestOptions);

  }

}
