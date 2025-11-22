import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-card',
  standalone: false,
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() add = new EventEmitter<{
    product: Product;
    quantity: number;
  }>();

  quantity = 1;

  onQuantityChange(q: number) {
    this.quantity = Math.max(1, Math.floor(q || 1));
  }

  addToCart() {
    this.add.emit({ product: this.product, quantity: this.quantity });
  }
}
