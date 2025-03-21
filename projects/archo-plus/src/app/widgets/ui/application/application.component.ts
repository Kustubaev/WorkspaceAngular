import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import type { TuiDialogContext } from '@taiga-ui/core';
import { TuiButton, tuiDialog, TuiTextfield } from '@taiga-ui/core';
import { TuiDataListWrapper, TuiSlider } from '@taiga-ui/kit';
import {
  TuiInputModule,
  TuiSelectModule,
  TuiTextareaModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';
import { injectContext } from '@taiga-ui/polymorpheus';
import {
  RadioComponent,
  radioParamsInterface,
} from '../../../shared/ui/radio/radio.component';
import { getLocInArc, locArcInterface } from '../../../utils/infoApplication';
import { ExitModalComponent } from '../exit-modal/exit-modal.component';
import { Applicant } from '../../../models/applicant.model'

@Component({
  selector: 'app-application',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TuiButton,
    TuiDataListWrapper,
    TuiInputModule,
    TuiSelectModule,
    TuiSlider,
    TuiTextfield,
    TuiTextfieldControllerModule,
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

    isSnils: [
      { value: this.data.isSnils, disabled: this.isEdit() },
      Validators.required,
    ],

    passport: this.fb.group({
      isMain: [
        { value: this.data.passport.isMain, disabled: this.isEdit() },
        Validators.required,
      ],
      isRegistration: [
        { value: this.data.passport.isRegistration, disabled: this.isEdit() },
        Validators.required,
      ],
      isChangePassport: [
        { value: this.data.passport.isChangePassport, disabled: this.isEdit() },
        Validators.required,
      ],
    }),

    diploma: this.fb.group({
      isTitlePage: [
        { value: this.data.diploma.isTitlePage, disabled: this.isEdit() },
        Validators.required,
      ],
      isAttachmentPage: [
        { value: this.data.diploma.isAttachmentPage, disabled: this.isEdit() },
        Validators.required,
      ],
    }),

    statement: this.fb.group({
      isFirst: [
        { value: this.data.statement.isFirst, disabled: this.isEdit() },
        Validators.required,
      ],
      isSecond: [
        { value: this.data.statement.isSecond, disabled: this.isEdit() },
        Validators.required,
      ],
      isThird: [
        { value: this.data.statement.isThird, disabled: this.isEdit() },
        Validators.required,
      ],
    }),

    opd: this.fb.group({
      isFirst: [
        { value: this.data.opd.isFirst, disabled: this.isEdit() },
        Validators.required,
      ],
      isSecond: [
        { value: this.data.opd.isSecond, disabled: this.isEdit() },
        Validators.required,
      ],
      isThird: [
        { value: this.data.opd.isThird, disabled: this.isEdit() },
        Validators.required,
      ],
      isFourth: [
        { value: this.data.opd.isFourth, disabled: this.isEdit() },
        Validators.required,
      ],
    }),

    isMarriage: [
      { value: this.data.isMarriage, disabled: this.isEdit() },
      Validators.required,
    ],
    isNameChange: [
      { value: this.data.isNameChange, disabled: this.isEdit() },
      Validators.required,
    ],

    comment: [{ value: this.data.comment, disabled: this.isEdit() }],
  });

  ngOnInit() {}

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
    // const formControls = this.form?.controls;
    // for (const controlName in formControls) {
    //   if (formControls.hasOwnProperty(controlName)) {
    //     //@ts-ignore
    //     const control = formControls[controlName];
    //     console.log(`Поле: ${controlName}, Валидно: ${!control.invalid}`);
    //   }
    // }

    console.log('this.form.value', this.form.value);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { fio, archiveNumber, managersId, currentLocationsId, ...newObject } =
      this.form.value;

    const resultObject: Applicant = {
      ...this.data,
      ...(newObject as Applicant),
    };

    this.context.completeWith(resultObject);

    // console.log(this.form);
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
