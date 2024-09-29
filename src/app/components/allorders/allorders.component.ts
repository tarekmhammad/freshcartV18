import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { CartItem, Order } from '../../core/interface/order';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [NgIf, NgFor, CurrencyPipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss',
})
export class AllordersComponent implements OnInit {
  constructor(
    private _AuthService: AuthService,
    private _CartService: CartService
  ) {}

  userId: any = '';
  orders: any[] = [];
  totalSalary: number = 0;
  ngOnInit(): void {
    this._AuthService.decodeUser();
    this.userId = this._AuthService.userInfo.id;
    console.log(this._AuthService.userInfo.id);
    this.getOrders();
  }

  getOrders() {
    this._CartService.getOrders(this._AuthService.userInfo.id).subscribe({
      next: (response) => {
        this.orders = response;
        this.totalSalary = response[0].totalOrderPrice;
        // console.log(response);
        // console.log(response[0].cartItems);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
