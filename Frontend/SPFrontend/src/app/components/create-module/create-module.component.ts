import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CreateModuleService} from "../../services/create-module.service";



@Component({
  selector: 'app-new-module',
  templateUrl: './create-module.component.html',
  styleUrls: ['./create-module.component.css']
})
export class CreateModuleComponent implements OnInit {
private postData: string = "course:";

  constructor(private router: Router, private cm: CreateModuleService ) {}

  ngOnInit(): void {
  }

  abortNewModule(){
   /* this.router.navigate(['/test-page']); */
    console.log('Abort works');
  }
  createNewModule(inputField1: string){


    this.cm.sendModuleToDB({"course": inputField1}, 'http://localhost:8080/rest/module/create');
    /* this.router.navigate(['/test-page']); */
    /*console.log('create works'); */
  }

}
