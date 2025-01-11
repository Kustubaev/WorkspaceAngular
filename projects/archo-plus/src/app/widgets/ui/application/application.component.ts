import { AsyncPipe } from '@angular/common';
import type { TemplateRef } from '@angular/core';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiAmountPipe } from '@taiga-ui/addon-commerce';
import { TuiAutoFocus } from '@taiga-ui/cdk';
import type { TuiDialogContext } from '@taiga-ui/core';
import {
  TuiButton,
  TuiDialogService,
  TuiGroup,
  TuiTextfield,
} from '@taiga-ui/core';
import {
  TuiBlock,
  TuiDataListWrapper,
  TuiFade,
  TuiSlider,
} from '@taiga-ui/kit';
import {
  TuiInputModule,
  TuiSelectModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';
import { injectContext } from '@taiga-ui/polymorpheus';
import { Applicant } from '../../../models/applicant.model';
import {
  RadioComponent,
  radioParamsInterface,
} from '../../../shared/ui/radio/radio.component';
import { getLocInArc, locArcInterface } from '../../../utils/infoApplication';

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
  ],
  templateUrl: './application.component.html',
  styleUrl: './application.component.scss',
})
export class ApplicationComponent {
  // Это работает как Output и Input <то что вернём, то что получим>
  public readonly context =
    injectContext<TuiDialogContext<Applicant, Applicant>>();

  protected readonly data: Applicant = this.context.data;
  protected readonly locInArc: locArcInterface = getLocInArc(
    this.data.archiveNumber
  );

  constructor() {}

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
    isSnils: [{ value: this.data.isSnils, disabled: false }],

    'passport.isMain': [{ value: this.data.passport.isMain, disabled: false }],
    'passport.isRegistration': [
      { value: this.data.passport.isRegistration, disabled: false },
    ],
    'passport.isChangePassport': [
      { value: this.data.passport.isChangePassport, disabled: false },
    ],

    'diploma.isTitlePage': [
      { value: this.data.diploma.isTitlePage, disabled: false },
    ],
    'diploma.isAttachmentPage': [
      { value: this.data.diploma.isAttachmentPage, disabled: false },
    ],

    'statement.isFirst': [
      { value: this.data.statement.isFirst, disabled: false },
    ],
    'statement.isSecond': [
      { value: this.data.statement.isSecond, disabled: false },
    ],
    'statement.isThird': [
      { value: this.data.statement.isThird, disabled: false },
    ],

    'opd.isFirst': [{ value: this.data.opd.isFirst, disabled: false }],
    'opd.isSecond': [{ value: this.data.opd.isSecond, disabled: false }],
    'opd.isThird': [{ value: this.data.opd.isThird, disabled: false }],
    'opd.isFourth': [{ value: this.data.opd.isFourth, disabled: false }],

    isMarriage: [{ value: this.data.isMarriage, disabled: false }],
    isNameChange: [{ value: this.data.isNameChange, disabled: false }],
  });

  protected radioParams: radioParamsInterface[] = [
    {
      value: 0,
      name: 'Нет',
    },
    {
      value: 1,
      name: 'Есть',
    },
    {
      value: 2,
      name: 'Нн',
    },
    {
      value: 3,
      name: 'Дн',
    },
  ];

  protected submit(): void {
    // this.context.completeWith({ name: this.name, value: this.value });
  }

  //  Понадобится для уточнения о вызове дела
  private readonly dialogs = inject(TuiDialogService);
  protected showDialog(content: TemplateRef<TuiDialogContext>): void {
    this.dialogs.open(content, { dismissible: true }).subscribe();
  }
}
