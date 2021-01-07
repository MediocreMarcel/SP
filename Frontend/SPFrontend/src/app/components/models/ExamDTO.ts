import {User} from "./User";
import {ModuleDTO} from "./ModuleDTO";

export class ExamDTO {
  exam_id: number;
  title: string;
  creation_date: string ;
  exam_date: number;
  status: any;
  total_points: number;
  module: ModuleDTO;

  constructor(exam_id,title,creation_date,exam_date,status,total_points,module) {
    this.exam_id = exam_id;
    this.title = title;
    this.creation_date = creation_date;
    this.exam_date = exam_date;
    this.status = status;
    this.total_points= total_points;
    this.module = module;
  }

}

export class CreateExamDTO {
  title: string;
  creation_date: number ;
  exam_date: number;
  status: string;
  module: ModuleDTO;

  constructor(title:string,creation_date:number,exam_date:number,user:User,module:ModuleDTO) {
    this.title = title;
    this.creation_date = creation_date;
    this.exam_date = exam_date;
    this.module = module;
    this.status = "in_creation";
  }

}
