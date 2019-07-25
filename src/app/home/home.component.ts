import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private carouselItems;
  private categories;

  constructor(
    private homeService:HomeService
  ) { }

  ngOnInit() {
    this.getHomeStaticData();
  }

  private getHomeStaticData() {
    this.homeService.getHomeStaticData().subscribe(data => {
      console.log('data', data)
      this.carouselItems = data[0];
      this.categories = data[1];
    })
  }

}
