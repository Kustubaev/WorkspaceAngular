import { Injectable } from '@angular/core';
import { JsonService } from '../../../../../utils/service/json.service'
import { Applicant } from '../models/applicant.model'

@Injectable({
  providedIn: 'root'
})
export class ApplicantsService extends JsonService<Applicant> {
  constructor() {
    super('http://localhost:5001/applicants');
  }
}