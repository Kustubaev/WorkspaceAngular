import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import {
  ControlContainer,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { TuiValidationError } from '@taiga-ui/cdk';
import { TuiError, TuiGroup, TuiLabel } from '@taiga-ui/core';
import { TuiBlock, TuiRadio } from '@taiga-ui/kit';

import { TuiSwitch } from '@taiga-ui/kit';
@Component({
  selector: 'app-radio',
  standalone: true,
  imports: [
    TuiGroup,
    TuiRadio,
    TuiBlock,
    TuiError,
    TuiLabel,
    TuiSwitch,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.scss',
})
export class RadioComponent {
  @Input() formCName!: string;
  @Input() formGName: string | null = null;
  @Input() params: radioParamsInterface[] = [];

  protected formGroup!: FormGroup;
  private controlContainer: ControlContainer = inject(ControlContainer);

  protected valid: boolean = true;
  ngOnInit() {
    this.formGroup = this.controlContainer.control as FormGroup;
    this.valid = true;

    const value = this.formGroup.get(
      this.formGName ? this.formGName + '.' + this.formCName : this.formCName
    )?.value;

    this.valid = this.params.some((param) => param.value === value);
  }

  protected error = new TuiValidationError('Обязательно к заполнению!');

  protected get computedError(): TuiValidationError | null {
    return this.valid ? null : this.error;
  }
}

export interface radioParamsInterface {
  value: string;
  name: string;
}
