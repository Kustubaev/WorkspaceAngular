import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'
import { TuiGroup } from '@taiga-ui/core';
import { TuiBlock, TuiRadio } from '@taiga-ui/kit';

@Component({
  selector: 'app-radio',
  standalone: true,
  imports: [TuiGroup, TuiRadio, TuiBlock, ReactiveFormsModule],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.scss',
})
export class RadioComponent {
  @Input() params: radioParamsInterface[] = [];
  @Input() formName: string = '';
}

export interface radioParamsInterface {
  value: number;
  name: string;
}
