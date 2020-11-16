import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-module',
  templateUrl: './create-module.component.html',
  styleUrls: ['./create-module.component.css']
})
export class CreateModuleComponent implements OnInit {

  constructor(private router: Router ) {}

  ngOnInit(): void {
  }

  abortNewModule(){
   /* this.router.navigate(['/test-page']); */
    console.log('Abort works');
  }
  createNewModule(){
    /* this.router.navigate(['/test-page']); */
    console.log('create works');
  }

}
