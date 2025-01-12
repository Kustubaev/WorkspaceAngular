import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiAmountPipe } from '@taiga-ui/addon-commerce';
import { TuiAutoFocus } from '@taiga-ui/cdk';
import type { TuiDialogContext } from '@taiga-ui/core';
import { TuiButton, tuiDialog, TuiGroup, TuiTextfield } from '@taiga-ui/core';
import {
  TuiBlock,
  TuiDataListWrapper,
  TuiFade,
  TuiSlider,
} from '@taiga-ui/kit';
import {
  TuiInputModule,
  TuiSelectModule,
  TuiTextareaModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';
import { injectContext } from '@taiga-ui/polymorpheus';
import { Applicant } from '../../../models/applicant.model';
import {
  RadioComponent,
  radioParamsInterface,
} from '../../../shared/ui/radio/radio.component';
import { getLocInArc, locArcInterface } from '../../../utils/infoApplication';
import { ExitModalComponent } from '../exit-modal/exit-modal.component';

@Component({
  selector: 'app-application',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule,
    TuiAmountPipe,
    TuiAutoFocus,
    TuiButton,
    TuiDataListWrapper,
    TuiInputModule,
    TuiSelectModule,
    TuiSlider,
    TuiTextfield,
    TuiTextfieldControllerModule,
    TuiBlock,
    TuiGroup,
    TuiFade,
    RadioComponent,
    TuiTextareaModule,
  ],
  templateUrl: './application.component.html',
  styleUrl: './application.component.scss',
})
export class ApplicationComponent {
  // Это работает как Output и Input <то что вернём, то что получим>
  public readonly context =
    injectContext<TuiDialogContext<Applicant | boolean, Applicant>>();

  protected readonly data: Applicant = this.context.data;
  protected readonly locInArc: locArcInterface = getLocInArc(
    this.data.archiveNumber
  );

  constructor() {}
  protected isEdit = signal<boolean>(true);
  private readonly fb = inject(FormBuilder);
  protected form = this.fb.group({
    fio: [
      {
        value: `${this.data.person.lastName} ${this.data.person.firstName} ${this.data.person.middleName}`,
        disabled: true,
      },
    ],
    archiveNumber: [{ value: this.data.archiveNumber, disabled: true }],
    managersId: [{ value: this.data.managersId, disabled: true }],
    currentLocationsId: [
      { value: this.data.currentLocationsId, disabled: true },
    ],
    isSnils: [{ value: this.data.isSnils, disabled: this.isEdit() }],

    'passport.isMain': [
      { value: this.data.passport.isMain, disabled: this.isEdit() },
    ],
    'passport.isRegistration': [
      { value: this.data.passport.isRegistration, disabled: this.isEdit() },
    ],
    'passport.isChangePassport': [
      { value: this.data.passport.isChangePassport, disabled: this.isEdit() },
    ],

    'diploma.isTitlePage': [
      { value: this.data.diploma.isTitlePage, disabled: this.isEdit() },
    ],
    'diploma.isAttachmentPage': [
      { value: this.data.diploma.isAttachmentPage, disabled: this.isEdit() },
    ],

    'statement.isFirst': [
      { value: this.data.statement.isFirst, disabled: this.isEdit() },
    ],
    'statement.isSecond': [
      { value: this.data.statement.isSecond, disabled: this.isEdit() },
    ],
    'statement.isThird': [
      { value: this.data.statement.isThird, disabled: this.isEdit() },
    ],

    'opd.isFirst': [{ value: this.data.opd.isFirst, disabled: this.isEdit() }],
    'opd.isSecond': [
      { value: this.data.opd.isSecond, disabled: this.isEdit() },
    ],
    'opd.isThird': [{ value: this.data.opd.isThird, disabled: this.isEdit() }],
    'opd.isFourth': [
      { value: this.data.opd.isFourth, disabled: this.isEdit() },
    ],

    isMarriage: [{ value: this.data.isMarriage, disabled: this.isEdit() }],
    isNameChange: [{ value: this.data.isNameChange, disabled: this.isEdit() }],

    comment: [{ value: this.data.comment, disabled: this.isEdit() }],
  });

  ngOnInit() {
    console.log('iSsnils work', this.form);
  }

  protected edit() {
    this.isEdit.set(false);
    this.form.enable();
    this.form.get('fio')?.disable();
    this.form.get('archiveNumber')?.disable();
    this.form.get('managersId')?.disable();
    this.form.get('currentLocationsId')?.disable();
  }

  private readonly dialog = tuiDialog(ExitModalComponent, {
    dismissible: true,
    label: 'Уверены что ходите выйти?',
    size: 's',
  });

  protected cancel() {
    this.isEdit()
      ? this.context.completeWith(false)
      : this.dialog().subscribe(
          (data) => data && this.context.completeWith(false)
        );
  }

  protected submit(): void {
    // this.context.completeWith({ name: this.name, value: this.value });
  }

  protected radioParams: radioParamsInterface[] = [
    {
      value: '0',
      name: 'Нет',
    },
    {
      value: '1',
      name: 'Есть',
    },
    {
      value: '2',
      name: 'Нн',
    },
    {
      value: '3',
      name: 'Дн',
    },
  ];
}
