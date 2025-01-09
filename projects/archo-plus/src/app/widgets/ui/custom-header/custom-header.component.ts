import { Component, inject } from '@angular/core';
import { TUI_DARK_MODE, TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'app-custom-header',
  standalone: true,
  imports: [TuiButton],
  templateUrl: './custom-header.component.html',
  styleUrl: './custom-header.component.scss',
})
export class CustomHeaderComponent {
  protected readonly darkMode = inject(TUI_DARK_MODE);
}
