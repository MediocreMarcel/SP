export class ModuleDTO {
  module_id: number;
  course: string;
  definition: string;

  constructor(module_id, course, definition) {
    this.module_id = module_id;
    this.course = course;
    this.definition = definition;
  }
}

export class CreateModuleDTO {
  course: string;
  definition: string;
  user_id: number;

  constructor(course, definition, user_id) {
    this.course = course;
    this.definition = definition;
    this.user_id = user_id;
  }
}
