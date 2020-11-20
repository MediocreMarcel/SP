import {Component, OnInit} from '@angular/core';
import {QuestionsOverviewService} from "../../services/questions-overview-service.service";

@Component({
    selector: 'app-questions-overview',
    templateUrl: './questions-overview.component.html',
    styleUrls: ['./questions-overview.component.css']
})
export class QuestionsOverviewComponent implements OnInit {

    tiles: ModuleDTO[];


    constructor(private service: QuestionsOverviewService) {
        service.sendModuleToDB({
            "username": "0",
            "password": "pw",
            "mail": "mail",
            "name": "Hans-Peter",
            "surname": "Mustermann"
        }).subscribe(u => this.tiles = u);
    }

    ngOnInit(): void {
    }

    public sortChanged(value) {
        if (value === "definition") {
            this.tiles.sort((a, b) => a.definition.localeCompare(b.definition));
        } else if (value === "course") {
            this.tiles.sort((a, b) => a.course.localeCompare(b.course));
        }
    }


    navigateToQuestionsCollection(questionCollectionName: string) {

    }
}

export class ModuleDTO {
    module_id: number;
    course: string;
    definition: string;
}
