import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Brand } from '../../core/interface/brand';
import { NgFor } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [NgFor, NgxPaginationModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent implements OnInit {
  constructor(private _ProductService: ProductService) {}

  brands: Brand[] = [];
  pageSize: number = 0;
  curentPage: number = 1;
  total: number = 0;

  ngOnInit(): void {
    this._ProductService.getBrands().subscribe({
      next: (response) => {
        // console.log(response);
        this.brands = response.data;
        this.pageSize = response.metadata.limit;
        this.curentPage = response.metadata.currentPage;
        this.total = response.results;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  pageChanged(event: any): void {
    this._ProductService.getBrands(event).subscribe({
      next: (response) => {
        // console.log(response);
        this.brands = response.data;
        this.pageSize = response.metadata.limit;
        this.curentPage = response.metadata.currentPage;
        this.total = response.results;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
