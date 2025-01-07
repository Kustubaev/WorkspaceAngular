import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';
import { JsonService } from '../../../../../utils/service/json.service'

@Injectable({
  providedIn: 'root',
})
export class StudentsService extends JsonService<Student> {
  constructor() {
    super('http://localhost:5001/students');
  }
}
