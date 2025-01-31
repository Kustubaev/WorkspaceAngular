import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiTextfield } from '@taiga-ui/core';
import { TuiInputModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';
import { FormFilterService } from '../../../service/form-filter.service';
import { CheckboxComponent } from '../../../shared/ui/checkbox/checkbox.component';
import { radioParamsInterface } from '../../../shared/ui/radio/radio.component';

import { TUI_DEFAULT_MATCHER, tuiPure } from '@taiga-ui/cdk';
import { TuiDataList } from '@taiga-ui/core';
import { TuiDataListWrapper } from '@taiga-ui/kit';
import { TuiMultiSelectModule } from '@taiga-ui/legacy';

@Component({
  selector: 'app-form-filter',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CheckboxComponent,
    TuiInputModule,
    TuiTextfield,
    TuiTextfieldControllerModule,
    ReactiveFormsModule,
    TuiDataList,
    TuiDataListWrapper,
    TuiMultiSelectModule,
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

  protected managersIdControl!: FormControl;

  ngOnInit() {
    this.form.valueChanges.subscribe((value) => {
      console.log('form.valueChanges', value.managersId);
    });

    this.managersIdControl = this.form.get('managersId') as FormControl;
  }

  // Это нужно для tui-multi-select
  protected search: string | null = '';
  @tuiPure
  protected filter(
    search: string | null,
    ITEMS: readonly string[]
  ): readonly string[] {
    return ITEMS.filter((item) => TUI_DEFAULT_MATCHER(item, search || ''));
  }

  protected MANAGERS_ID: readonly string[] = [
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
  ];
  protected POSITIONS_ID: readonly string[] = [
    '6',
    '13',
    '14',
    '15',
    '16',
    '17',
  ];
  // Параметры для радио кнопок
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
