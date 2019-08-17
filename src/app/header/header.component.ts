import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { UserService } from '../user/user.service';
import { User } from '../shared/models/data-model';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private isOverlay = false;
  private user:User;
  
  constructor(
    private cartService:CartService,
    private userService:UserService,
    private router:Router
  ) {
    this.user = new User();
   }

  ngOnInit() {
  }
  
  private logIn() {
    this.userService.login(this.user).subscribe(user => {
      this.router.navigate(['/pending-orders'])
    });
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


