import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CartService } from '../cart/cart.service';
import { MessageService } from '../shared/message/message/message.service';

@Injectable({
  providedIn: 'root'
})
export class CartGuard implements CanActivate {

  constructor(
    private cartService: CartService,
    private messageService:MessageService,
    private router:Router
  ) { }

  canActivate(): Observable<boolean> | boolean {
    if (this.cartService.order && this.cartService.order.order_items.length) {
      return true;
    }

    const error = { error: 'You have no items in your shopping cart yet.', status: 500 };
    this.messageService.sendErrorMessage(new HttpErrorResponse(error));
    // this.router.navigate(['/home']);
  }
}
