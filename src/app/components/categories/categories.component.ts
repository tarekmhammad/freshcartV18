import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Category } from '../../core/interface/category';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  constructor(private _ProductService: ProductService) {}

  cagetories: Category[] = [];

  ngOnInit(): void {
    this._ProductService.getCategories().subscribe({
      next: (response) => {
        this.cagetories = response.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
