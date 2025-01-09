import { Component, inject } from '@angular/core';

import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import type { TuiTablePaginationEvent } from '@taiga-ui/addon-table';
import {
  TuiReorder,
  TuiTable,
  TuiTablePagination,
} from '@taiga-ui/addon-table';
import { TuiLet } from '@taiga-ui/cdk';
import {
  TuiButton,
  TuiDropdown,
  TuiLabel,
  TuiLoader,
  TuiNumberFormat,
  TuiScrollbar,
} from '@taiga-ui/core';
import { TuiCheckbox, TuiChevron } from '@taiga-ui/kit';
import {
  TuiInputModule,
  TuiInputNumberModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';

import { BehaviorSubject } from 'rxjs';
import { RestService } from '../../../service/rest.service';

type Key = 'age' | 'dob' | 'name'; // нужны для сортировки

// function sortBy(
//   key: 'age' | 'dob' | 'name',
//   direction: -1 | 1
// ): TuiComparator<User> {
//   return (a, b) =>
//     key === 'age'
//       ? direction * tuiDefaultSort(getAge(a), getAge(b))
//       : direction * tuiDefaultSort(a[key], b[key]);
// }

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    TuiButton,
    TuiCheckbox,
    TuiChevron,
    TuiDropdown,
    TuiInputModule,
    TuiInputNumberModule,
    TuiLabel,
    TuiLet,
    TuiLoader,
    TuiNumberFormat,
    TuiReorder,
    TuiTable,
    TuiTablePagination,
    TuiTextfieldControllerModule,
    TuiScrollbar,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  private restService: RestService = inject(RestService);
  protected readonly applicants = this.restService.applicants;
  protected readonly status = this.restService.status;
  protected readonly locations = this.restService.locations;
  protected readonly managers = this.restService.managers;

  ngOnInit() {
    this.restService
      .getAll({
        applicants: {
          pagination: {
            page: this.page$.value + 1,
            count: this.size$.value,
          },
        },
        // id: 2,
        // embed: 'locations',
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
        //   { value: 'managersId', order: 'desc' },
        //   { value: 'currentLocationsId', order: 'asc' },
        // ],
      })
      .subscribe((res) => {
        console.log('res', res);
        console.log('applicants', this.restService.applicants());
        console.log('status', this.restService.status());
        console.log('locations', this.restService.locations());
        console.log('managers', this.restService.managers());
      });
  }

  public getStatusText(elemId: string): string {
    const statusItem = this.status()?.data?.find((s) => s.id === elemId);
    return statusItem ? statusItem.text : '';
  }

  public getStatusColor(elemId: string): string {
    const statusItem = this.status()?.data?.find((s) => s.id === elemId);
    return statusItem ? statusItem.color : '';
  }

  private readonly size$ = new BehaviorSubject(10);
  protected readonly page$ = new BehaviorSubject(0);

  protected readonly direction$ = new BehaviorSubject<-1 | 1>(-1);
  protected readonly sorter$ = new BehaviorSubject<Key>('name');

  // protected initial: readonly string[] = [
  //   'Номер в архиве',
  //   'Фамилия',
  //   'Имя',
  //   'Отчество',
  //   'Менеджер',
  //   'Находится',
  //   'CНИЛС',

  //   '1-2',
  //   '5-6',
  //   '18-19',

  //   'Титульный',
  //   'Приложение',

  //   'Заявление',
  //   'Приложение',
  //   'Согласие',

  //   'Согласие 1',
  //   'Согласие 2',
  //   'Распространение 1',
  //   'Распространение 2',

  //   'Брак',
  //   'Смена ФИО',
  //   'Комментарий',
  // ];

  protected columns: any = [
    'archiveNumber',
    'lastName',
    'firstName',
    'middleName',
    'managersId',
    'currentLocationsId',
    'isSnils',

    'isMain',
    'isRegistration',
    'isChangePassport',

    'isTitlePage',
    'isAttachmentPage',

    'statementIsFirst',
    'statementIsSecond',
    'statementIsThird',

    'opdIsFirst',
    'opdIsSecond',
    'opdIsThird',
    'opdIsFourth',

    'isMarriage',
    'isNameChange',
    'comment',
  ];

  protected onPagination({ page, size }: TuiTablePaginationEvent): void {
    this.page$.next(page);
    this.size$.next(size);
    this.restService
      .getAll({
        applicants: {
          pagination: {
            page: this.page$.value + 1,
            count: this.size$.value,
          },
        },
      })
      .subscribe((res) => {
        console.log('res', res);
      });
  }

  protected search = '';
  protected minAge = new FormControl(0); // Удалить
}
