import { Component } from '@angular/core';
import { TuiButton, TuiDialogContext } from '@taiga-ui/core';
import { injectContext } from '@taiga-ui/polymorpheus';

@Component({
  selector: 'app-exit-modal',
  standalone: true,
  imports: [TuiButton],
  templateUrl: './exit-modal.component.html',
  styleUrl: './exit-modal.component.scss',
})
export class ExitModalComponent {
  public readonly context = injectContext<TuiDialogContext<boolean, void>>();

  protected exit(value: boolean): void {
    this.context.completeWith(value);
  }
}
