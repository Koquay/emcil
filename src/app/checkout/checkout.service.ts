import { Injectable } from '@angular/core';
import { of, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private expMonths;
  private expYears;

  constructor() {
    this.createDb();
  }

  public getStaticData() {
    return forkJoin([
      of(this.expMonths),
      of(this.expYears),
    ])
  }

  private createDb() {
    this.expMonths = [
      { month: null },
      { month: '01 January' },
      { month: '02 February' },
      { month: '03 March' },
      { month: '04 April' },
      { month: '05 May' },
      { month: '06 June' },
      { month: '07 July' },
      { month: '08 August' },
      { month: '09 September' },
      { month: '10 October' },
      { month: '11 November' },
      { month: '12 December' },
    ];

    this.expYears = [
      { year: null },
      { year: '2019' },
      { year: '2020' },
      { year: '2021' },
      { year: '2022' },
      { year: '2023' },
      { year: '2024' },
      { year: '2025' },
      { year: '2026' },
      { year: '2027' },
      { year: '2028' },
    ];
  }
}
