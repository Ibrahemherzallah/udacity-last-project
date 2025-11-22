import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.services';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  feedback = '';

  constructor(private productService: ProductService, private cart: CartService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (list) => this.products = list,
      error: () => this.feedback = 'Failed to load products.'
    });
  }

  handleAdd(evt: {product: Product; quantity: number }) {
    this.cart.addToCart(evt.product, evt.quantity);
    this.feedback = `Added ${evt.quantity} x "${evt.product.name}" to cart.`;
    setTimeout(() => this.feedback = '', 2000);
  }
}
