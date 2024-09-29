import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interface/product';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(products: Product[], text: string): Product[] {
    return products.filter((ele) =>
      ele.title.toLowerCase().includes(text.toLocaleLowerCase())
    );
  }
}
