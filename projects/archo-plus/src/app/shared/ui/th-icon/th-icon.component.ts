import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TuiIcon } from '@taiga-ui/core';

@Component({
  selector: 'app-th-icon',
  standalone: true,
  imports: [CommonModule, TuiIcon],
  templateUrl: './th-icon.component.html',
  styleUrl: './th-icon.component.scss',
})
export class ThIconComponent {
  @Input() direction: number = 0;
  @Input() sequence: number = 0;

  protected directionObject: { [key: number]: string } = {
    '0': 'chevrons-up-down',
    '1': 'chevron-up',
    '-1': 'chevron-down',
  };

  protected sortApplicant(data: any) {
    console.log(data);
  }
}
