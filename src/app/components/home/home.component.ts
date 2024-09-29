import { errorContext } from 'rxjs/internal/util/errorContext';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/interface/product';
import { CurrencyPipe, NgFor, NgIf, SlicePipe } from '@angular/common';
import { CuttextPipe } from '../../core/pipe/cuttext.pipe';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Category } from '../../core/interface/category';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../core/services/auth.service';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    CuttextPipe,
    CurrencyPipe,
    SlicePipe,
    CarouselModule,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(
    private _ProductService: ProductService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _Renderer2: Renderer2,
    private _AuthService: AuthService,
    private _WishlistService: WishlistService
  ) {}

  products: Product[] = [];
  categories: Category[] = [];
  wishListData: string[] = [];

  mainSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplaySpeed: 1000,
    navText: ['', ''],
    items: 1,
    nav: false,
  };
  categoryOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplaySpeed: 1000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2,
      },
      400: {
        items: 3,
      },
      740: {
        items: 4,
      },
      940: {
        items: 6,
      },
    },
    nav: false,
  };

  ngOnInit(): void {
    this._AuthService.decodeUser();
    // console.log(this._AuthService.userInfo.value);

    this.getProducts();

    this.getCategories();
    this.getWishlist();
  }
  getWishlist(): void {
    this._WishlistService.getWishlist().subscribe({
      next: (response) => {
        // console.log(response);
        const newData = response.data.map((ele: any) => ele._id);
        this.wishListData = newData;
      },
    });
  }

  getProducts(): void {
    this._ProductService.getProucts().subscribe({
      next: (response) => {
        this.products = response.data;
      },
    });
  }

  getCategories(): void {
    this._ProductService.getCategories().subscribe({
      next: (respone) => {
        this.categories = respone.data;
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
