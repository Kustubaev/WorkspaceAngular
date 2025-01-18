import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CheckboxComponent } from '../../../shared/ui/checkbox/checkbox.component';
import { radioParamsInterface } from '../../../shared/ui/radio/radio.component';

@Component({
  selector: 'app-form-filter',
  standalone: true,
  imports: [ReactiveFormsModule, CheckboxComponent],
  templateUrl: './form-filter.component.html',
  styleUrl: './form-filter.component.scss',
})
export class FormFilterComponent {
  private readonly fb = inject(FormBuilder);
  protected form = this.fb.group({
    person: this.fb.group({
      firstName: [{ value: '' }],
      lastName: [{ value: '' }],
      middleName: [{ value: '' }],
    }),

    managersId: [{ value: '' }],
    currentLocationsId: [{ value: '' }],
    archiveNumber: [{ value: '' }],

    isSnils: this.fb.array([]),

    passport: this.fb.group({
      isMain: this.fb.array([]),
      isRegistration: this.fb.array([]),
      isChangePassport: this.fb.array([]),
    }),

    diploma: this.fb.group({
      isTitlePage: this.fb.array([]),
      isAttachmentPage: this.fb.array([]),
    }),

    statement: this.fb.group({
      isFirst: this.fb.array([]),
      isSecond: this.fb.array([]),
      isThird: this.fb.array([]),
    }),

    opd: this.fb.group({
      isFirst: this.fb.array([]),
      isSecond: this.fb.array([]),
      isThird: this.fb.array([]),
      isFourth: this.fb.array([]),
    }),

    isMarriage: this.fb.array([]),
    isNameChange: this.fb.array([]),
  });

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
