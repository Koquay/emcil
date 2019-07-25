import { Injectable } from '@angular/core';
import { of, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private carouselItems;
  private categories;

  constructor() {
    this.createCarouselItems();
  }

  public getHomeStaticData() {
    return forkJoin([
      of(this.carouselItems), 
      of(this.categories)
    ])
    return of(this.carouselItems);
  }

  private createCarouselItems() {
    this.carouselItems = {
      items: [
        {link: '', src: 'ezgif-1-4c5356e4e2a5.jpg', alt: ''},
        {link: '', src: 'ezgif-1-d937390733e5.jpg', alt: ''},
        {link: '', src: 'ezgif-1-c402985bfe3c.jpg', alt: ''},
        {link: '', src: 'ezgif-1-f13a1c74a928.jpg', alt: ''},
        {link: '', src: 'ezgif-1-f1c99974a1da.jpg', alt: ''},              
      ]
    };

    this.categories = {
      cards: [
        {title: "Dresses", img: '18182204.jpg', product_type:'dresses'},
        {title: "Women's Shoes", img: '18340227.jpg', product_type:'womens-shoes'},
        {title: 'Handbags', img: '19061780.jpg', product_type:'handbags'},
        {title: 'Jewellery', img: '18377442.jpg', product_type:'jewellery'},
        {title: "Men's Suits", img: 'ezgif-1-1cdd1505eee4.jpg', product_type:'mens-suits'},
        {title: "Men's Shoes", img: 'ezgif-1-efb24a72f48f.jpg', product_type:'mens-shoes'},
        
      ]
    }
  }
}
