import { CartService } from './../../core/services/cart.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/interface/product';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { CuttextPipe } from '../../core/pipe/cuttext.pipe';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchPipe } from '../../core/pipe/search.pipe';
import { FormsModule } from '@angular/forms';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    CurrencyPipe,
    CuttextPipe,
    RouterLink,
    NgxPaginationModule,
    SearchPipe,
    FormsModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  constructor(
    private _ProductService: ProductService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _Renderer2: Renderer2,
    private _WishlistService: WishlistService
  ) {}
  products: Product[] = [];
  wishListData: any[] = [];
  pageSize: number = 0;
  curentPage: number = 1;
  total: number = 0;
  term: string = '';

  ngOnInit(): void {
    this.getProducts();

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

  getProducts(): void {
    this._ProductService.getProucts().subscribe({
      next: (response) => {
        this.products = response.data;
        this.pageSize = response.metadata.limit;
        this.curentPage = response.metadata.currentPage;
        this.total = response.results;
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

  pageChanged(event: any): void {
    this._ProductService.getProucts(event).subscribe({
      next: (response) => {
        this.products = response.data;
        this.pageSize = response.metadata.limit;
        this.curentPage = response.metadata.currentPage;
        this.total = response.results;
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
        this.wishListData = response.data;
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
        const numOfArr = response.data.length;
        this._WishlistService.countOfWish.next(numOfArr);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
