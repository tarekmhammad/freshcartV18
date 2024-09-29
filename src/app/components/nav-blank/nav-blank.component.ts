import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss',
})
export class NavBlankComponent implements OnInit {
  constructor(
    private _Router: Router,
    private _CartService: CartService,
    private _Renderer2: Renderer2,
    private _WishlistService: WishlistService
  ) {}
  numOfCart: number = 0;
  numOfWishList: number = 0;

  @ViewChild('navBar') navElement!: ElementRef;

  @HostListener('window:scroll')
  onScroll(): void {
    if (scrollY > 400) {
      this._Renderer2.addClass(this.navElement.nativeElement, 'shadow');
    } else {
      this._Renderer2.removeClass(this.navElement.nativeElement, 'shadow');
    }
  }

  ngOnInit(): void {
    this._CartService.cartNumber.subscribe({
      next: (response) => {
        this.numOfCart = response;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this._CartService.getCartUser().subscribe({
      next: (response) => {
        this.numOfCart = response.numOfCartItems;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this._WishlistService.countOfWish.subscribe({
      next: (response) => {
        this.numOfWishList = response;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this._WishlistService.getWishlist().subscribe({
      next: (response) => {
        this.numOfWishList = response.count;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  signOut(): void {
    localStorage.removeItem('etoken');
    this._Router.navigate(['/login']);
  }
}
