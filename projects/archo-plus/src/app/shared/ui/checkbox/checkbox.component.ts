import { Component, inject, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { radioParamsInterface } from '../radio/radio.component';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiGroup, TuiLabel } from '@taiga-ui/core';
import { TuiSwitch } from '@taiga-ui/kit';
import { FormFilterService } from '../../../service/form-filter.service';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [ReactiveFormsModule, TuiLabel, TuiSwitch, CommonModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
})
export class CheckboxComponent {
  @Input() formGroup!: FormGroup;
  @Input() forGName!: string;
  @Input() formAName!: string;
  @Input() params: radioParamsInterface[] = [];
  @Input() title!: string;

  protected formFilterService = inject(FormFilterService);

  protected readonly fb = inject(FormBuilder);
  protected newForm = this.fb.group({});

  ngOnInit() {
    this.params.forEach((param) => {
      this.newForm.addControl(param.value, this.fb.control(false));
    });

    this.newForm.valueChanges.subscribe((values) => {
      this.updateFormArray(values);
    });
  }

  private updateFormArray(values: objectResult): void {
    const control = this.formGroup.get(
      this.forGName ? this.forGName + '.' + this.formAName : this.formAName
    ) as FormArray;

    for (const key of Object.keys(values)) {
      if (!control.value.includes(key) && values[key]) {
        this.formFilterService.addControlToArray(control, key);
      } else if (values[key] === false) {
        this.formFilterService.removeControlFromArray(control, key);
      }
    }
  }
}

interface objectResult {
  [key: string]: boolean;
}
