import { Component, inject, signal } from '@angular/core';

import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import type { TuiTablePaginationEvent } from '@taiga-ui/addon-table';
import {
  TuiReorder,
  TuiTable,
  TuiTablePagination,
} from '@taiga-ui/addon-table';
import { TuiLet } from '@taiga-ui/cdk';
import {
  TuiButton,
  tuiDialog,
  TuiDropdown,
  TuiIcon,
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

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, debounceTime, startWith, tap } from 'rxjs';
import { Applicant } from '../../../models/applicant.model';
import { RestService } from '../../../service/rest.service';
import { ThIconComponent } from '../../../shared/ui/th-icon/th-icon.component';
import { ApplicationComponent } from '../../../widgets/ui/application/application.component';

// type Key =
//   | 'archiveNumber'
//   | 'lastName'
//   | 'firstName'
//   | 'middleName'
//   | 'managersId'
//   | 'currentLocationsId'
//   | 'isSnils'
//   | 'isMain'
//   | 'isRegistration'
//   | 'isChangePassport'
//   | 'isTitlePage'
//   | 'isAttachmentPage'
//   | 'statementIsFirst'
//   | 'statementIsSecond'
//   | 'statementIsThird'
//   | 'opdIsFirst'
//   | 'opdIsSecond'
//   | 'opdIsThird'
//   | 'opdIsFourth'
//   | 'isMarriage'
//   | 'isNameChange'
//   | 'comment';

// export const columnKeys: string[] = [
//   'archiveNumber',
//   'lastName',
//   'firstName',
//   'middleName',
//   'managersId',
//   'currentLocationsId',
//   'isSnils',

//   'isMain',
//   'isRegistration',
//   'isChangePassport',

//   'isTitlePage',
//   'isAttachmentPage',

//   'statementIsFirst',
//   'statementIsSecond',
//   'statementIsThird',

//   'opdIsFirst',
//   'opdIsSecond',
//   'opdIsThird',
//   'opdIsFourth',

//   'isMarriage',
//   'isNameChange',
//   'comment',
// ];

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
    TuiIcon,
    ThIconComponent,
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
    this.onReloadData();
  }

  private onReloadData() {
    this.restService
      .getAll({
        applicants: {
          pagination: {
            page: this.page$.value + 1,
            count: this.size$.value,
          },
          sort: this.sorter$.value,
          conditions: [
            {
              name: 'archiveNumber',
              comparison: '==',
              value: this.searchForm.value.search as string,
            },
          ],
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
        },
      })
      .subscribe((res) => {
        console.log('res', res);
      });
  }

  // Функции вывода статуса
  public getStatusText(elemId: string): string {
    const statusItem = this.status()?.data?.find((s) => s.id === elemId);
    return statusItem ? statusItem.text : '';
  }
  public getStatusColor(elemId: string): string {
    const statusItem = this.status()?.data?.find((s) => s.id === elemId);
    return statusItem ? statusItem.color : '';
  }

  protected titleArray = signal<titleArray[]>([
    { target: 'archiveNumber', title: 'Номер в архиве', direction: 0, seq: 0 }, // 1
    { target: 'person.lastName', title: 'Фамилия', direction: 0, seq: 0 }, // 2
    { target: 'person.firstName', title: 'Имя', direction: 0, seq: 0 }, // 3
    { target: 'person.middleName', title: 'Отчество', direction: 0, seq: 0 }, // 4
    { target: 'managersId', title: 'Менеджер', direction: 0, seq: 0 }, // 5
    { target: 'currentLocationsId', title: 'Находится', direction: 0, seq: 0 }, // 6
    { target: 'isSnils', title: 'CНИЛС', direction: 0, seq: 0 }, // 7
    { target: 'passport.isMain', title: '1-2', direction: 0, seq: 0 }, // 8
    { target: 'passport.isRegistration', title: '5-6', direction: 0, seq: 0 }, // 9
    {
      target: 'passport.isChangePassport',
      title: '18-19',
      direction: 0,
      seq: 0,
    }, // 10
    { target: 'diploma.isTitlePage', title: 'Тит', direction: 0, seq: 0 }, // 11
    { target: 'diploma.isAttachmentPage', title: 'Прл', direction: 0, seq: 0 }, // 12
    { target: 'statement.isFirst', title: 'Заяв', direction: 0, seq: 0 }, // 13
    { target: 'statement.isSecond', title: 'Прл', direction: 0, seq: 0 }, // 14
    { target: 'statement.isThird', title: 'Согл', direction: 0, seq: 0 }, // 15
    { target: 'opd.isFirst', title: 'С1', direction: 0, seq: 0 }, // 16
    { target: 'opd.isSecond', title: 'С2', direction: 0, seq: 0 }, // 17
    { target: 'opd.isThird', title: 'П1', direction: 0, seq: 0 }, // 18
    { target: 'opd.isFourth', title: 'П2', direction: 0, seq: 0 }, // 19
    { target: 'isMarriage', title: 'Брак', direction: 0, seq: 0 }, // 20
    { target: 'isNameChange', title: 'Смена ФИО', direction: 0, seq: 0 }, // 21
    { target: 'comment', title: 'Комментарий', direction: 0, seq: 0 }, // 22
  ]);

  // Массив названий колонок
  protected columns: string[] = [
    'open',
    'archiveNumber',
    'person.lastName',
    'person.firstName',
    'person.middleName',
    'managersId',
    'currentLocationsId',
    'isSnils',

    'passport.isMain',
    'passport.isRegistration',
    'passport.isChangePassport',

    'diploma.isTitlePage',
    'diploma.isAttachmentPage',

    'statement.isFirst',
    'statement.isSecond',
    'statement.isThird',

    'opd.isFirst',
    'opd.isSecond',
    'opd.isThird',
    'opd.isFourth',

    'isMarriage',
    'isNameChange',
    'comment',
  ];

  // Пагинация таблицы
  private readonly size$ = new BehaviorSubject(10); // По сколько элементов отображать в таблице
  protected readonly page$ = new BehaviorSubject(0); // Текущая страница в таблице
  protected onPagination({ page, size }: TuiTablePaginationEvent): void {
    this.page$.next(page);
    this.size$.next(size);
    this.onReloadData();
  }

  // Сортировка таблицы
  protected readonly sorter$ = new BehaviorSubject<string>('');
  protected onSortChange(data: titleArray) {
    const maxSeq = this.titleArray().reduce(
      (max, item) =>
        data.target !== item.target && item.seq > max ? item.seq : max,
      0
    );

    this.titleArray.update((titles) => {
      return titles.map((item) => {
        if (item.target === data.target) {
          const newDirection =
            data.direction !== -1
              ? item.direction === 1
                ? -1
                : item.direction === -1
                ? 0
                : 1
              : 0;

          const newSeq =
            data.direction !== -1
              ? item.seq === 0
                ? maxSeq + 1
                : item.seq
              : 0;
          return { ...item, direction: newDirection, seq: newSeq };
        }

        if (data.direction === -1 && item.seq > data.seq) {
          return { ...item, seq: item.seq - 1 };
        }

        return item;
      });
    });

    const resultString: string = [...this.titleArray()]
      .filter((item) => item.seq !== 0)
      .sort((a, b) => a.seq - b.seq)
      .map((item) => (item.direction === -1 ? `-${item.target}` : item.target))
      .join(',');

    this.sorter$.next(resultString);
    this.onReloadData();
  }

  // Поиск
  constructor() {
    this.searchForm.valueChanges
      .pipe(
        startWith({}),
        debounceTime(500),
        tap(() => this.onReloadData()),
        takeUntilDestroyed()
      )
      .subscribe();
  }
  private readonly fb = inject(FormBuilder);
  protected searchForm = this.fb.group({
    search: [''],
  });

  private readonly dialog = tuiDialog(ApplicationComponent, {
    dismissible: true,
    label: 'Информация о деле',
    size: 'auto',
  });

  protected showDialog(object: Applicant): void {
    this.dialog(object).subscribe({
      next: (data: Applicant | boolean) => {
        console.log(`Dialog emitted data`, data);
      },
      complete: () => {
        console.log('Dialog closed');
      },
    });
  }
}

interface titleArray {
  target: string;
  title: string;
  direction: number;
  seq: number;
}

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
