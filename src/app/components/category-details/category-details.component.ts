import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { Category } from '../../core/interface/category';

@Component({
  selector: 'app-category-details',
  standalone: true,
  imports: [],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.scss',
})
export class CategoryDetailsComponent implements OnInit {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductService: ProductService
  ) {}

  categoryId: string | null = '';
  categoryDetails: Category = { name: '', image: '' };
  // categoryDetails: Category = { } as Category

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.categoryId = params.get('id');
      },
      error: (err) => {
        console.log(err);
      },
    });

    this._ProductService.getCategoryDetails(this.categoryId).subscribe({
      next: (response) => {
        // console.log(response);
        this.categoryDetails = response.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
