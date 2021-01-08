export class CourseDTO {

  courseName: string;
  courseId: number;


  constructor(courseName, courseId) {
    this.courseName = courseName;
    this.courseId = courseId;
  }
}
