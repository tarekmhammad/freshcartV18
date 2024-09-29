import { Component, OnInit, Renderer2 } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { Product } from '../../core/interface/product';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CuttextPipe } from '../../core/pipe/cuttext.pipe';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [NgFor, RouterLink, CuttextPipe, CurrencyPipe, NgIf],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent implements OnInit {
  constructor(
    private _WishlistService: WishlistService,
    private _ToastrService: ToastrService,
    private _CartService: CartService,
    private _Renderer2: Renderer2
  ) {}

  products: Product[] = [];
  wishListData: string[] = [];

  ngOnInit(): void {
    this._WishlistService.getWishlist().subscribe({
      next: (response) => {
        // console.log(response);
        this.products = response.data;
        const newData = response.data.map((ele: any) => ele._id);
        this.wishListData = newData;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  addFav(id: string | undefined): void {
    this._WishlistService.addToWish(id).subscribe({
      next: (response) => {
        // console.log(response);
        this._ToastrService.success(response.message);
        const numOfArr = response.data.length;
        this._WishlistService.countOfWish.next(numOfArr);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  removeFav(id: string | undefined): void {
    this._WishlistService.removeFromWish(id).subscribe({
      next: (response) => {
        // console.log(response);
        this._ToastrService.success(response.message);
        this.wishListData = response.data;
        const newProducts = this.products.filter((ele: any) =>
          this.wishListData.includes(ele._id)
        );
        this.products = newProducts;
        const numOfArr = response.data.length;
        this._WishlistService.countOfWish.next(numOfArr);
        // this._WishlistService.getWishlist().subscribe({
        //   next: (response) => {
        //     this.products = response.data;
        //   },
        // });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  addProduct(id: any, element: HTMLButtonElement): void {
    this._Renderer2.setAttribute(element, 'disabled', 'true');
    this._CartService.addToCart(id).subscribe({
      next: (response) => {
        // console.log(response);
        this._ToastrService.success(response.message);
        this._Renderer2.removeAttribute(element, 'disabled');
        this._CartService.cartNumber.next(response.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
        this._Renderer2.removeAttribute(element, 'disabled');
      },
    });
  }
}
