import { Component, OnInit } from '@angular/core';
import { CartItem, CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  items: CartItem[] = [];
  total = 0;

  feedback: string | null = null;
  private timer: any;

  constructor(private cart: CartService) {}

  ngOnInit(): void {
    this.refresh();
    this.cart.totalAmount$.subscribe(t => this.total = t);
  }

  refresh(): void {
    this.items = this.cart.getItems();
  }

  showFeedback(message: string): void {
    this.feedback = message;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.feedback = null, 2500);
  }

  onQtyChange(id: number, q: number): void {
    this.cart.updateQuantity(id, Math.floor(q || 1));
    this.refresh();
  }

  remove(id: number): void {
    this.cart.remove(id);
    this.refresh();
    this.showFeedback('Item removed from cart.');
  }

  clear(): void {
    this.cart.clear();
    this.refresh();
    this.showFeedback('Cart has been cleared.');
  }
}