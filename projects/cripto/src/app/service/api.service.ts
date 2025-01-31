import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  protected baseUrl =
    'https://api2.bybit.com/web3/api/quote/v1/token/suggest?tag=hot&limit=300&walletId=';
  protected readonly http: HttpClient = inject(HttpClient);

  constructor() {}

  public getCoins() {
    return this.http.get<any>(this.baseUrl);
  }
}

export interface Token {
  address: string;
  chainId: number;
  chainName: string;
  decimals: number;
  favoriteFlag: boolean;
  hotFlag: boolean;
  icon: string;
  liquidity: string;
  price: string;
  priceChange: string;
  tokenId: number;
  tokenName: string;
  tokenTags: string[];
  volume: string;
}
