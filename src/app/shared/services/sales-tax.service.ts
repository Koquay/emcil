import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SalesTaxService {
  private taxes;

  constructor() {
    this.createSalesTaxDB();
   }

  public getTaxRate(province) {
    let taxInfo = this.taxes.find(target => target.province == province);
    if(taxInfo) {
      return taxInfo.totalTaxRate;
    }    
    return 0;
  }

  private createSalesTaxDB() {
    this.taxes = [
      {province: "AB", rateType: "GST", totalTaxRate: .05},
      {province: "BC", rateType: "GST+PST", totalTaxRate: .12 },
      {province: "MB", rateType: "GST+PST", totalTaxRate: .13},
      {province: "NB", rateType: "HST", totalTaxRate: .15},
      {province: "NL", rateType: "HST", totalTaxRate: .15},
      {province: "NS", rateType: "HST", totalTaxRate: .15},
      {province: "NT", rateType: "GST", totalTaxRate: .05},  
      {province: "NU", rateType: "GST", totalTaxRate: .05},
      {province: "ON", rateType: "HST", totalTaxRate: .13},
      {province: "PE", rateType: "HST", totalTaxRate: .15},
      {province: "QC", rateType: "GST+QST", totalTax: .14975},
      {province: "SK", rateType: "GST+PST", totalTax: .11},
      {province: "YT", rateType: "GST", totalTax: .05},                      
    ];
  }
}
