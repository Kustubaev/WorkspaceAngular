import { Component, inject, Input } from '@angular/core';
import {
  ControlContainer,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { radioParamsInterface } from '../radio/radio.component';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiGroup, TuiLabel } from '@taiga-ui/core';
import { TuiSwitch } from '@taiga-ui/kit';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [ReactiveFormsModule, TuiLabel, TuiSwitch, CommonModule, TuiGroup],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
})
export class CheckboxComponent {
  @Input() formAName!: string;
  @Input() formGName: string | null = null;
  @Input() params: radioParamsInterface[] = [];

  protected formGroup!: FormGroup;
  private controlContainer: ControlContainer = inject(ControlContainer);

  ngOnInit() {
    this.formGroup = this.controlContainer.control as FormGroup;

    // const control = this.formGroup.get(
    //   this.formGName ? this.formGName + '.' + this.formAName : this.formAName
    // ) as FormArray;

    // control.push(new FormControl('1' as string));
    // control.push(new FormControl('0' as string));
    // control.push(new FormControl('3' as string));
    // console.log('this.control', control);
  }

  onCheckboxChange(event: any) {
    const control = this.formGroup.get(
      this.formGName ? this.formGName + '.' + this.formAName : this.formAName
    ) as FormArray;

    if (event.target.checked) {
      control.push(new FormControl(event.target.value));
    } else {
      const index = control.controls.findIndex(
        (x) => x.value === event.target.value
      );
      control.removeAt(index);
    }
  }
}
