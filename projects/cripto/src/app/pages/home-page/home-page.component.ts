import { Component, inject } from '@angular/core';
import { ApiService, Token } from '../../service/api.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  protected apiService = inject(ApiService);
  protected coins: Token[] = [];

  public coins$ = this.apiService.getCoins().subscribe((val) => {
    console.log('val', val);
  });
}
