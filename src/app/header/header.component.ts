import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { UserService } from '../user/user.service';
import { User } from '../shared/models/data-model';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private isOverlay = false;
  private credentials: {email:string, password:string, token:string}; 
  private user:User;
  
  constructor(
    private cartService:CartService,
    private userService:UserService
  ) {
    this.credentials = {email: 'admin@admin.com', password: 'admin', token: ''};
    this.user = new User();
   }

  ngOnInit() {
  }
  
  private logIn() {
    this.userService.logIn(this.user).subscribe(user => {

    })
  }
  private showOverlay() {
    console.log('SHOW OVERLAY')
    this.isOverlay = true;
  }

  private hideOverlay() {
    console.log('HIDE OVERLAY')
    this.isOverlay = false;
  }
}


