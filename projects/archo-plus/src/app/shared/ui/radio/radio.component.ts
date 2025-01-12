import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import {
  ControlContainer,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { TuiGroup } from '@taiga-ui/core';
import { TuiBlock, TuiRadio } from '@taiga-ui/kit';

@Component({
  selector: 'app-radio',
  standalone: true,
  imports: [TuiGroup, TuiRadio, TuiBlock, ReactiveFormsModule, CommonModule],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.scss',
})
export class RadioComponent {
  @Input() formName!: string;
  @Input() params: radioParamsInterface[] = [];

  protected formGroup!: FormGroup;
  private controlContainer: ControlContainer = inject(ControlContainer);

  ngOnInit() {
    this.formGroup = this.controlContainer.control as FormGroup;
  }
}

export interface radioParamsInterface {
  value: string;
  name: string;
}
