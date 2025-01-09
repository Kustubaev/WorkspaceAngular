import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TUI_DARK_MODE, TuiRoot } from '@taiga-ui/core';
import { CustomFooterComponent } from './widgets/ui/custom-footer/custom-footer.component';
import { CustomHeaderComponent } from './widgets/ui/custom-header/custom-header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TuiRoot,
    RouterOutlet,
    CustomHeaderComponent,
    CustomFooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'archo-plus';
  protected readonly darkMode = inject(TUI_DARK_MODE);
}
