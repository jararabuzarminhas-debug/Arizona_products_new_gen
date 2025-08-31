import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService, CartItem } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Cart Overlay -->
    <div class="fixed inset-0 bg-black bg-opacity-50 z-50" (click)="closeCart()">
      <div class="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl" (click)="$event.stopPropagation()">
        <!-- Cart Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 class="text-xl font-bold text-medical-navy">Shopping Cart</h2>
          <button (click)="closeCart()" class="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <svg class="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>

        <!-- Cart Items -->
        <div class="flex-1 overflow-y-auto p-6">
          <div *ngIf="cartService.items().length === 0" class="text-center py-12">
            <svg class="w-24 h-24 mx-auto text-gray-300 mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
            </svg>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
            <p class="text-gray-500 mb-6">Add some products to get started</p>
            <button (click)="closeCart()" routerLink="/shop" class="bg-medical-blue text-white px-6 py-2 rounded-lg font-medium hover:bg-medical-navy transition-colors">
              Continue Shopping
            </button>
          </div>

          <div *ngIf="cartService.items().length > 0" class="space-y-4">
            <div *ngFor="let item of cartService.items()" class="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
              <!-- Product Image -->
              <img [src]="item.image" [alt]="item.name" class="w-16 h-16 object-contain rounded-lg bg-gray-50">
              
              <!-- Product Details -->
              <div class="flex-1">
                <h3 class="font-medium text-gray-900">{{item.name}}</h3>
                <div class="flex items-center space-x-2 mt-1">
                  <span class="text-lg font-bold text-medical-navy">PKR {{item.price}}</span>
                  <span *ngIf="item.originalPrice" class="text-sm text-gray-400 line-through">PKR {{item.originalPrice}}</span>
                </div>
                
                <!-- Quantity Controls -->
                <div class="flex items-center mt-2">
                  <button (click)="updateQuantity(item.id, item.quantity - 1)" 
                          class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-lg hover:bg-gray-50">
                    <span class="text-lg">−</span>
                  </button>
                  <input type="number" [value]="item.quantity" (change)="onQuantityChange(item.id, $event)"
                         min="1" [max]="item.maxQuantity || 99"
                         class="w-16 h-8 text-center border-t border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-medical-blue">
                  <button (click)="updateQuantity(item.id, item.quantity + 1)" 
                          class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-lg hover:bg-gray-50">
                    <span class="text-lg">+</span>
                  </button>
                </div>
              </div>
              
              <!-- Remove Button -->
              <button (click)="removeItem(item.id)" class="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 102 0v3a1 1 0 11-2 0V9zm4 0a1 1 0 10-2 0v3a1 1 0 102 0V9z" clip-rule="evenodd"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Cart Footer -->
        <div *ngIf="cartService.items().length > 0" class="border-t border-gray-200 p-6 bg-gray-50">
          <!-- Order Summary -->
          <div class="space-y-2 mb-4">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Subtotal ({{cartService.itemCount()}} items)</span>
              <span class="font-medium">PKR {{cartService.subtotal()}}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Shipping</span>
              <span class="font-medium">
                <span *ngIf="cartService.getShippingCost() === 0" class="text-healthcare-green">FREE</span>
                <span *ngIf="cartService.getShippingCost() > 0">PKR {{cartService.getShippingCost()}}</span>
              </span>
            </div>
            <div *ngIf="cartService.subtotal() < 1000 && cartService.subtotal() > 0" class="text-xs text-gray-500">
              Add PKR {{1000 - cartService.subtotal()}} more for free shipping
            </div>
            <div class="flex justify-between text-lg font-bold text-medical-navy border-t pt-2">
              <span>Total</span>
              <span>PKR {{cartService.getTotal()}}</span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="space-y-3">
            <button (click)="proceedToCheckout()" 
                    class="w-full bg-medical-blue text-white py-3 rounded-lg font-bold hover:bg-medical-navy transition-colors">
              Proceed to Checkout
            </button>
            <button (click)="closeCart()" routerLink="/shop"
                    class="w-full border-2 border-medical-blue text-medical-blue py-3 rounded-lg font-bold hover:bg-medical-blue hover:text-white transition-colors">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CartComponent {
  isOpen = signal(false);

  constructor(public cartService: CartService) {}

  openCart(): void {
    this.isOpen.set(true);
  }

  closeCart(): void {
    this.isOpen.set(false);
  }

  updateQuantity(itemId: string, quantity: number): void {
    this.cartService.updateQuantity(itemId, quantity);
  }

  onQuantityChange(itemId: string, event: Event): void {
    const target = event.target as HTMLInputElement;
    const quantity = parseInt(target.value);
    if (!isNaN(quantity) && quantity > 0) {
      this.updateQuantity(itemId, quantity);
    }
  }

  removeItem(itemId: string): void {
    this.cartService.removeFromCart(itemId);
  }

  proceedToCheckout(): void {
    this.closeCart();
    // TODO: Navigate to checkout page
    console.log('Proceeding to checkout...');
  }
}
