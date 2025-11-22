import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

interface CheckoutForm {
  name: string;
  address: string;
  payment: string;
}

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})

export class CheckoutComponent {

  model: CheckoutForm = {
    name: '',
    address: '',
    payment: ''
  };

  submitted = false;

  constructor(private cart: CartService, private router: Router) {}

  onSubmit(formValid: boolean) {
    this.submitted = true;
    if (!formValid) return;

    const order = {
      items: this.cart.getItems(),
      total: this.cart.getItems()
              .reduce((s, i) => s + i.product.price * i.quantity, 0),
      customer: { ...this.model }
    };

    this.cart.clear();

    this.router.navigateByUrl('/success', { state: order });
  }
}