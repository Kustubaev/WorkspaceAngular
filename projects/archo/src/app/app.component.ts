import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TUI_DARK_MODE, TuiRoot } from '@taiga-ui/core';
import { FooterComponent } from './component/widgets/ui/footer/footer.component';
import { HeaderComponent } from './component/widgets/ui/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TuiRoot, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'archo';
  protected readonly darkMode = inject(TUI_DARK_MODE);
}
