import { inject, Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormFilterService {
  private readonly fb = inject(FormBuilder);
  public createForm(): FormGroup {
    return this.fb.group({
      person: this.fb.group({
        firstName: '',
        lastName: '',
        middleName: '',
      }),

      archiveNumber: '',

      managersId: [{ value: '' }],
      currentLocationsId: [{ value: '' }],

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

      isSnils: this.fb.array([]),
      isMarriage: this.fb.array([]),
      isNameChange: this.fb.array([]),
    });
  }

  public addControlToArray(formArray: FormArray, controlValue: string): void {
    formArray.push(new FormControl(controlValue));
  }

  public removeControlFromArray(
    formArray: FormArray,
    controlValue: string
  ): void {
    const index = formArray.controls.findIndex((x) => x.value === controlValue);
    if (index !== -1) {
      formArray.removeAt(index);
    }
  }
}
