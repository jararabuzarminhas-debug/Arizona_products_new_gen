import { Component, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from './services/cart.service';
import { AuthService } from './services/auth.service';
import { CartComponent } from './components/cart.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, CartComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Arizona Health Care Products';
  isCartOpen = signal(false);

  @ViewChild(CartComponent) cartComponent!: CartComponent;

  constructor(
    public cartService: CartService,
    public authService: AuthService
  ) {}

  openCart(): void {
    this.isCartOpen.set(true);
    if (this.cartComponent) {
      this.cartComponent.openCart();
    }
  }

  closeCart(): void {
    this.isCartOpen.set(false);
    if (this.cartComponent) {
      this.cartComponent.closeCart();
    }
  }
}
