import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from '../../services/cart.service';

@Component({
  selector: 'app-order-confirmation',
  standalone: false,
  templateUrl: './order-confirmation.component.html',
  styleUrl: './order-confirmation.component.css'
})

export class OrderConfirmationComponent {
  items: CartItem[] = [];
  total = 0;
  name = '';

  constructor(private router: Router) {
    const nav = this.router.currentNavigation();
    const state = nav?.extras?.state as any;

    if (state) {
      this.items = state.items || [];
      this.total = state.total || 0;
      this.name = state.customer?.name || '';
    }
  }
}