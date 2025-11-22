import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.services';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  product?: Product;
  quantity = 1;
  feedback = '';

  constructor(
    private route: ActivatedRoute,
    private products: ProductService,
    private cart: CartService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.products.getProductById(id).subscribe(prod => this.product = prod);
  }

  onQtyChange(q: number) {
    this.quantity = Math.max(1, Math.floor(q || 1));
  }

  add() {
    if (!this.product) return;
    this.cart.addToCart(this.product, this.quantity);
    this.feedback = 'Added to cart!';
    setTimeout(() => this.feedback = '', 1500);
  }
}