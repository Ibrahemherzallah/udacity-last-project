import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  itemCount = 0;
  private sub?: Subscription;

  constructor(private cart: CartService) {}

  ngOnInit(): void {
    this.sub = this.cart.itemCount$.subscribe(count => this.itemCount = count);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}