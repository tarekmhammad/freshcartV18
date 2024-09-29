import {
  Component,
  ElementRef,
  HostListener,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { NavBlankComponent } from '../../components/nav-blank/nav-blank.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-blank-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavBlankComponent, FooterComponent],
  templateUrl: './blank-layout.component.html',
  styleUrl: './blank-layout.component.scss',
})
export class BlankLayoutComponent {
  constructor(private _Renderer2: Renderer2) {}

  @ViewChild('btnUp') btnUp!: ElementRef;

  @HostListener('window:scroll')
  onScroll(): void {
    if (scrollY > 300) {
      this._Renderer2.removeClass(this.btnUp.nativeElement, 'd-none');
    } else {
      this._Renderer2.addClass(this.btnUp.nativeElement, 'd-none');
    }
  }

  goToUp(): void {
    window.scrollTo(0, 0);
  }
}
