import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-questions-overview',
  templateUrl: './questions-overview.component.html',
  styleUrls: ['./questions-overview.component.css']
})
export class QuestionsOverviewComponent implements OnInit {

  tiles = [
    {module: 'Algebra 3', course: 'Mathematik (B.Sc.)'},
    {module: 'Algorithmen und Datenstrukturen', course: 'Informatik (B.Sc.)'},
    {module: 'Mathematik 1', course: 'Informationslogistik (B.Sc.)'},
    {module: 'Operation Research', course: 'Wirtschaftsinformatik (B.Sc.)'},
    {module: 'Statistik', course: 'Wirtschaftsinformatik (B.Sc.)'},
    {module: 'Algebra 3', course: 'Mathematik (B.Sc.)'},
    {module: 'Algorithmen und Datenstrukturen', course: 'Informatik (B.Sc.)'},
    {module: 'Mathematik 1', course: 'Informationslogistik (B.Sc.)'},
    {module: 'Operation Research', course: 'Wirtschaftsinformatik (B.Sc.)'},
    {module: 'Statistik', course: 'Wirtschaftsinformatik (B.Sc.)'},
  ];

  constructor() {
    this.sortChanged("course")
   }

  ngOnInit(): void {
  }

  public sortChanged(value){
    if (value === "module"){
      this.tiles.sort((a,b) => a.module.localeCompare(b.module));
    } else if(value === "course"){
      this.tiles.sort((a,b) => a.course.localeCompare(b.course));
    }
  }


  navigateToQuestionsCollection(questionCollectionName: string) {

  }
}
