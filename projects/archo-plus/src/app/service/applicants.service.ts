import { Injectable, signal } from '@angular/core';
import { delay, tap } from 'rxjs';
import {
  getInterface,
  JsonService,
} from '../../../../../utils/service/json.service';
import { Applicant } from '../models/applicant.model';

@Injectable({
  providedIn: 'root',
})
export class ApplicantsService extends JsonService<Applicant> {
  public applicants = signal<Applicant[]>([]);

  constructor() {
    super('http://localhost:5001/applicants');
  }

  public getApplicants(data?: getInterface) {
    return this.getJson(data).pipe(
      delay(300),
      tap((res) => this.applicants.set(res))
    );
  }
  
}
