import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiTextfield } from '@taiga-ui/core';
import { TuiInputModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';
import { FormFilterService } from '../../../service/form-filter.service';
import { CheckboxComponent } from '../../../shared/ui/checkbox/checkbox.component';
import { radioParamsInterface } from '../../../shared/ui/radio/radio.component';

@Component({
  selector: 'app-form-filter',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CheckboxComponent,
    TuiInputModule,
    TuiTextfield,
    TuiTextfieldControllerModule,
  ],
  templateUrl: './form-filter.component.html',
  styleUrl: './form-filter.component.scss',
})
export class FormFilterComponent {
  protected form: FormGroup;
  private formFilterService = inject(FormFilterService);

  constructor() {
    this.form = this.formFilterService.createForm();
  }

  ngOnInit() {
    this.form.valueChanges.subscribe((value) => {
      console.log('form.valueChanges', value.archiveNumber);
    });
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
