import { Injectable, signal, computed } from '@angular/core';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  inStock: boolean;
  maxQuantity?: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = signal<CartItem[]>([]);

  // Computed values
  items = this.cartItems.asReadonly();
  itemCount = computed(() => this.cartItems().reduce((sum, item) => sum + item.quantity, 0));
  subtotal = computed(() => this.cartItems().reduce((sum, item) => sum + (item.price * item.quantity), 0));
  
  constructor() {
    // Load cart from localStorage on initialization
    this.loadCartFromStorage();
  }

  addToCart(product: Omit<CartItem, 'quantity'>, quantity: number = 1): void {
    const currentItems = this.cartItems();
    const existingItemIndex = currentItems.findIndex(item => item.id === product.id);

    if (existingItemIndex >= 0) {
      // Update existing item
      const existingItem = currentItems[existingItemIndex];
      const newQuantity = existingItem.quantity + quantity;
      const maxQty = product.maxQuantity || 99;
      
      if (newQuantity <= maxQty) {
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: newQuantity
        };
        this.cartItems.set(updatedItems);
      } else {
        console.warn(`Cannot add more. Maximum quantity is ${maxQty}`);
      }
    } else {
      // Add new item
      const newItem: CartItem = { ...product, quantity };
      this.cartItems.set([...currentItems, newItem]);
    }

    this.saveCartToStorage();
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const currentItems = this.cartItems();
    const updatedItems = currentItems.map(item => 
      item.id === productId ? { ...item, quantity } : item
    );
    
    this.cartItems.set(updatedItems);
    this.saveCartToStorage();
  }

  removeFromCart(productId: string): void {
    const currentItems = this.cartItems();
    const updatedItems = currentItems.filter(item => item.id !== productId);
    this.cartItems.set(updatedItems);
    this.saveCartToStorage();
  }

  clearCart(): void {
    this.cartItems.set([]);
    this.saveCartToStorage();
  }

  private saveCartToStorage(): void {
    try {
      localStorage.setItem('cart', JSON.stringify(this.cartItems()));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }

  private loadCartFromStorage(): void {
    try {
      const stored = localStorage.getItem('cart');
      if (stored) {
        const cartData = JSON.parse(stored);
        this.cartItems.set(cartData);
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
    }
  }

  // Get shipping cost based on subtotal
  getShippingCost(): number {
    const subtotal = this.subtotal();
    if (subtotal >= 1000) return 0; // Free shipping over PKR 1000
    return 150; // Standard shipping cost
  }

  // Get total including shipping
  getTotal(): number {
    return this.subtotal() + this.getShippingCost();
  }
}
