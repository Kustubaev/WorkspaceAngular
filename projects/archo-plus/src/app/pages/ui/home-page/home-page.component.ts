import { Component, inject } from '@angular/core';
import { Applicant } from '../../../models/applicant.model';
import { Student } from '../../../models/student.model';
import { ApplicantsService } from '../../../service/applicants.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  private applicantsService: ApplicantsService = inject(ApplicantsService);
  protected applicants: Applicant[] = [];

  ngOnInit() {
    this.applicantsService
      .getJson({
        // id: 2,
        embed: 'managers',
        // conditions: {
        //   name: 'averageGrade',
        //   comparison: '>=',
        //   value: 4,
        // },
        // range: {
        //   start: -2,
        //   end: -100,
        // },
        // pagination: {
        //   page: 3,
        //   count: 3,
        // },
        // sort: [
        //   { value: 'lastName', order: 'desc' },
        //   { value: 'id', order: 'asc' },
        // ],
      })
      .subscribe((data) => {
        this.applicants = data;
        console.log(this.applicants);
      });
  }

  clickStudent() {
    // const student: Student = {
    //   id: `${this.getMaxId() + 1}`,
    //   name: 'Zoro',
    //   lastName: 'Ivanov',
    //   group: 'group 1',
    //   averageGrade: 4,
    //   currentStudyYear: 3,
    // };
    // // this.studentService.putStudents(30, student).subscribe((data) => {
    // //   console.log(data);
    // // });
    // this.studentService
    //   .postStudents(student)
    //   .subscribe((data) => this.students.push(data as Student));
  }

  removeStudent(student: Student) {
    // this.studentService
    //   .deleteStudents(student.id, 'teachers')
    //   .subscribe((data) => {
    //     this.students = this.students.filter((s) => s.id !== student.id);
    //   });
  }

  getMaxId(): number {
    return this.applicants.reduce((max, obj) => {
      return Math.max(max, parseInt(obj.id));
    }, 0);
  }
}
