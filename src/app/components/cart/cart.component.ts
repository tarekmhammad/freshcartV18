import { Component, OnInit, Renderer2 } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgIf, NgFor, CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  constructor(
    private _CartService: CartService,
    private _Renderer2: Renderer2
  ) {}

  cartDetails: any = null;

  ngOnInit(): void {
    this._CartService.getCartUser().subscribe({
      next: (response) => {
        this.cartDetails = response.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  removeItem(id: string, element: HTMLButtonElement): void {
    this._Renderer2.setAttribute(element, 'disabled', 'true');
    this._CartService.removeCartItem(id).subscribe({
      next: (response) => {
        this._Renderer2.removeAttribute(element, 'disabled');
        this.cartDetails = response.data;
        this._CartService.cartNumber.next(response.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
        this._Renderer2.removeAttribute(element, 'disabled');
      },
    });
  }

  changeCount(
    count: number,
    id: string,
    element1: HTMLButtonElement,
    element2: HTMLButtonElement
  ) {
    if (count >= 1) {
      this._Renderer2.setAttribute(element1, 'disabled', 'true');
      this._Renderer2.setAttribute(element2, 'disabled', 'true');
      this._CartService.updateCartCount(id, count).subscribe({
        next: (response) => {
          this.cartDetails = response.data;
          this._Renderer2.removeAttribute(element1, 'disabled');
          this._Renderer2.removeAttribute(element2, 'disabled');
        },
        error: (err) => {
          this._Renderer2.removeAttribute(element1, 'disabled');
          this._Renderer2.removeAttribute(element2, 'disabled');
          console.log(err);
        },
      });
    }
  }

  clear(): void {
    this._CartService.clearCart().subscribe({
      next: (response) => {
        console.log(response);
        if (response.message === 'success') {
          this.cartDetails = null;
          this._CartService.cartNumber.next(0);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
