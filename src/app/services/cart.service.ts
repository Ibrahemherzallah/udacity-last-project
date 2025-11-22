import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly STORAGE_KEY = 'mystore-cart';

  private items: CartItem[] = [];
  private readonly count$ = new BehaviorSubject<number>(0);
  private readonly total$ = new BehaviorSubject<number>(0);

  readonly itemCount$ = this.count$.asObservable();
  readonly totalAmount$ = this.total$.asObservable();

  private readonly isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      const saved = window.localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        try {
          this.items = JSON.parse(saved) as CartItem[];
        } catch {
          this.items = [];
        }
      }
    }

    this.recompute();
  }

  getItems(): CartItem[] {
    return [...this.items];
  }

  addToCart(product: Product, quantity: number = 1): void {
    const existing = this.items.find(i => i.product.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ product, quantity: Math.max(1, Math.floor(quantity || 1)) });
    }
    this.persist();
  }

  updateQuantity(productId: number, quantity: number): void {
    const item = this.items.find(i => i.product.id === productId);
    if (!item) return;
    item.quantity = Math.max(1, Math.floor(quantity || 1));
    this.persist();
  }

  remove(productId: number): void {
    this.items = this.items.filter(i => i.product.id !== productId);
    this.persist();
  }

  clear(): void {
    this.items = [];
    this.persist();
  }

  private persist(): void {
    if (this.isBrowser) {
      window.localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.items));
    }
    this.recompute();
  }

  private recompute(): void {
    const count = this.items.reduce((s, i) => s + i.quantity, 0);
    const total = this.items.reduce((s, i) => s + i.product.price * i.quantity, 0);
    this.count$.next(count);
    this.total$.next(Number(total.toFixed(2)));
  }
}