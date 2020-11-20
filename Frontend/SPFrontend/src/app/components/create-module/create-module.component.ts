import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CreateModuleService} from "../../services/create-module.service";



@Component({
  selector: 'app-new-module',
  templateUrl: './create-module.component.html',
  styleUrls: ['./create-module.component.css']
})
export class CreateModuleComponent implements OnInit {
postDataArr: string[]= [];

  constructor(private router: Router, private cm: CreateModuleService ) {}

  ngOnInit(): void {
  }

  abortNewModule(){
   /* this.router.navigate(['/test-page']); */
    console.log('Abort works');
  }

  createNewModule(iFC: string, iFD: string){
    this.postDataArr.push(iFC, iFD);

    this.cm.sendModuleToDB(this.postDataArr, 'http://localhost:8080/rest/module/create');

  }

}
