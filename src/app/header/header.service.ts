import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private headerLinks;

  constructor() {
    this.createHeaderLinks();
   }

   private createHeaderLinks() {
     this.headerLinks = {
       title: 'EMCIL FASHION',
       phone: '(905) 517-9314',
       email: 'emcilfashion@yahoo.com', 
       links: [
         {title: '', }
       ]
     }
   }
}
