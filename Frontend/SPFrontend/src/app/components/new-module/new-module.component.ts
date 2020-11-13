import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-module',
  templateUrl: './new-module.component.html',
  styleUrls: ['./new-module.component.css']
})
export class NewModuleComponent implements OnInit {

  constructor(private router: Router ) {}

  ngOnInit(): void {
  }

  abortNewModule(){
   /* this.router.navigate(['/test-page']); */
    console.log('Abort works');
  }
}
