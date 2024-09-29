import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule, NgFor, CurrencyPipe, NgIf],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductService: ProductService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _Renderer2: Renderer2,
    private _WishlistService: WishlistService
  ) {}

  wishListData: string[] = [];
  productId!: string | null;
  productDetails: any = null;

  productDetailsOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplaySpeed: 1000,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false,
  };

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.productId = params.get('id');
      },
      error: (err) => {
        console.log(err);
      },
    });

    this._ProductService.getProductDetails(this.productId).subscribe({
      next: (response) => {
        this.productDetails = response.data;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this._WishlistService.getWishlist().subscribe({
      next: (response) => {
        const newData = response.data.map((ele: any) => ele._id);
        this.wishListData = newData;
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
  addFav(id: string | undefined): void {
    this._WishlistService.addToWish(id).subscribe({
      next: (response) => {
        // console.log(response);
        this._ToastrService.success(response.message);
        this.wishListData = response.data;
        const numOfArr = response.data.length;
        this._WishlistService.countOfWish.next(numOfArr);
        // this._WishlistService.countOfWish.next(response.count);
      },
    });
  }
  removeFav(id: string | undefined): void {
    this._WishlistService.removeFromWish(id).subscribe({
      next: (response) => {
        // console.log(response);
        this._ToastrService.success(response.message);
        this.wishListData = response.data;
        const numOfArr = response.data.length;
        this._WishlistService.countOfWish.next(numOfArr);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
