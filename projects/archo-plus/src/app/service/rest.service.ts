import { Injectable, signal } from '@angular/core';
import { catchError, delay, forkJoin, of, tap } from 'rxjs';
import {
  getInterface,
  JsonResInterface,
  JsonService,
} from '../../../../../utils/service/json.service';
import {
  Applicant,
  Location,
  Manager,
  Status,
} from '../models/applicant.model';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  private baseUrl = 'http://localhost:5001';

  protected applicantsService: JsonService<Applicant>;
  protected statusService: JsonService<Status>;
  protected locationsService: JsonService<Location>;
  protected managersService: JsonService<Manager>;

  public applicants = signal<JsonResInterface<Applicant>>({
    isLoading: false,
    data: [],
  });
  public status = signal<JsonResInterface<Status>>({
    isLoading: false,
    data: [],
  });
  public locations = signal<JsonResInterface<Location>>({
    isLoading: false,
    data: [],
  });
  public managers = signal<JsonResInterface<Manager>>({
    isLoading: false,
    data: [],
  });

  constructor() {
    this.applicantsService = new JsonService<Applicant>(
      `${this.baseUrl}/applicants`
    );
    this.statusService = new JsonService<Status>(`${this.baseUrl}/status`);
    this.locationsService = new JsonService<Location>(
      `${this.baseUrl}/locations`
    );
    this.managersService = new JsonService<Manager>(`${this.baseUrl}/managers`);
  }

  public getAll(data?: getAllInterface) {
    return forkJoin([
      this.getApplicants(data?.applicants),
      this.getStatus(data?.status),
      this.getLocations(data?.locations),
      this.getManagers(data?.managers),
    ]);
  }

  public getApplicants(data?: getInterface) {
    this.applicants.set({
      isLoading: true,
      data: this.applicants().data,
      pagination: this.applicants().pagination,
    });
    return this.applicantsService.getJson(data).pipe(
      delay(3500),
      tap((res) => this.applicants.set(res)),
      catchError((err) => {
        this.applicants.set({
          isLoading: false,
          data: this.applicants().data,
          pagination: this.applicants().pagination,
        });
        console.error('Error occurred while fetching applicants:', err);
        return of([]);
      })
    );
  }

  public getStatus(data?: getInterface) {
    this.status.set({
      isLoading: true,
      data: this.status().data,
      pagination: this.status().pagination,
    });
    return this.statusService.getJson(data).pipe(
      delay(3000),
      tap((res) => this.status.set(res)),
      catchError((err) => {
        this.status.set({
          isLoading: false,
          data: this.status().data,
          pagination: this.status().pagination,
        });
        console.error('Error occurred while fetching applicants:', err);
        return of([]);
      })
    );
  }

  public getLocations(data?: getInterface) {
    this.locations.set({
      isLoading: false,
      data: this.locations().data,
      pagination: this.locations().pagination,
    });
    return this.locationsService.getJson(data).pipe(
      delay(4000),
      tap((res) => this.locations.set(res)),
      catchError((err) => {
        this.locations.set({
          isLoading: false,
          data: this.locations().data,
          pagination: this.locations().pagination,
        });
        console.error('Error occurred while fetching applicants:', err);
        return of([]);
      })
    );
  }

  public getManagers(data?: getInterface) {
    this.managers.set({
      isLoading: false,
      data: this.managers().data,
      pagination: this.managers().pagination,
    });
    return this.managersService.getJson(data).pipe(
      delay(2500),
      tap((res) => this.managers.set(res)),
      catchError((err) => {
        this.managers.set({
          isLoading: false,
          data: this.managers().data,
          pagination: this.managers().pagination,
        });
        console.error('Error occurred while fetching applicants:', err);
        return of([]);
      })
    );
  }
}

interface getAllInterface {
  applicants?: getInterface;
  status?: getInterface;
  locations?: getInterface;
  managers?: getInterface;
}
