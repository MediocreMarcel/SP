import {User} from "./User";
import {ModuleDTO} from "./ModuleDTO";

export class ExamDTO {
  exam_id: number;
  title: string;
  creation_date: string ;
  exam_date: string;
  status: any;
  module: ModuleDTO;

  constructor(exam_id,title,creation_date,exam_date,status,module) {
    this.exam_id = exam_id;
    this.title = title;
    this.creation_date = creation_date;
    this.exam_date = exam_date;
    this.status = status;
    this.module = module;
  }

}

export class CreateExamDTO {
  title: string;
  creation_date: number ;
  exam_date: string;
  status: string;
  module: ModuleDTO;

  constructor(title:string,creation_date:number,exam_date:string,user:User,module:ModuleDTO) {
    this.title = title;
    this.creation_date = creation_date;
    this.exam_date = exam_date;
    this.module = module;
    this.status = "in_creation";
  }

}
