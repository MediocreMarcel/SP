import {CourseDTO} from "./CourseDTO";

export class ModuleDTO {
  module_id: number;
  course: CourseDTO;
  definition: string;

  constructor(module_id, course, definition) {
    this.module_id = module_id;
    this.course = course;
    this.definition = definition;
  }
}

export class CreateModuleDTO {
  course: CourseDTO;
  definition: string;
  user_id: number;

  constructor(course, definition, user_id) {
    this.course = course;
    this.definition = definition;
    this.user_id = user_id;
  }
}
