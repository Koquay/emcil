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
        {link: '', src: 'mens-shoes-group-2.jpg', alt: ''},
        {link: '', src: 'jewelry-group-2.jpg', alt: ''},
        {link: '', src: 'womens-shoes-group-2.jpg', alt: ''},
        {link: '', src: 'handbag-carousel-2.jpg', alt: ''},
        {link: '', src: 'jewelry-carousel-2.jpg', alt: ''},              
      ]
    };

    this.categories = {
      cards: [
        {title: "Dresses", img: '18182204.jpg', product_type:'dresses'},
        {title: "Women's Shoes", img: 'womens-shoes-group-1.jpg', product_type:"women's shoes"},
        {title: 'Handbags', img: 'handbags-main-1.jpg', product_type:'handbags'},
        {title: 'Jewellery', img: 'jewelry-group-1.jpg', product_type:'jewellery'},
        {title: "Men's Suits", img: 'ezgif-1-1cdd1505eee4.jpg', product_type:'mens-suits'},
        {title: "Men's Shoes", img: 'mens-shoes-group-1.jpg', product_type:'mens-shoes'},
        
      ]
    }
  }
}
