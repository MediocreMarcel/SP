export class StudentDTO {
  matrNumber: number;
  courseShortName: string;


  constructor(matrNumber: number, courseShortName: string) {
    this.matrNumber = matrNumber;
    this.courseShortName = courseShortName;

  }
}
