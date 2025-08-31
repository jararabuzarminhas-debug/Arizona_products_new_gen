import { Component, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CartService } from "../services/cart.service";

interface ShippingAddress {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  district: string;
  postalCode: string;
  deliveryInstructions: string;
}

interface PaymentMethod {
  type: "cod" | "jazzcash" | "easypaisa" | "bank_transfer" | "card";
  details?: any;
}

@Component({
  selector: "app-checkout",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <!-- Checkout Header -->
          <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-medical-navy font-medical mb-4">
              Checkout
            </h1>
            <div class="flex items-center justify-center space-x-4">
              <div class="flex items-center">
                <div
                  class="w-8 h-8 bg-medical-blue text-white rounded-full flex items-center justify-center text-sm font-bold"
                >
                  1
                </div>
                <span class="ml-2 text-sm font-medium text-medical-blue"
                  >Shipping</span
                >
              </div>
              <div class="w-8 h-0.5 bg-gray-300"></div>
              <div class="flex items-center">
                <div
                  class="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-bold"
                >
                  2
                </div>
                <span class="ml-2 text-sm font-medium text-gray-600"
                  >Payment</span
                >
              </div>
              <div class="w-8 h-0.5 bg-gray-300"></div>
              <div class="flex items-center">
                <div
                  class="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-bold"
                >
                  3
                </div>
                <span class="ml-2 text-sm font-medium text-gray-600"
                  >Confirmation</span
                >
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Checkout Form -->
            <div class="lg:col-span-2">
              <form (ngSubmit)="processOrder()" #checkoutForm="ngForm">
                <!-- Shipping Information -->
                <div class="bg-white rounded-xl p-6 shadow-lg mb-6">
                  <h2 class="text-xl font-bold text-medical-navy mb-6">
                    Shipping Information
                  </h2>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 mb-2"
                        >First Name *</label
                      >
                      <input
                        type="text"
                        [(ngModel)]="shippingAddress.firstName"
                        name="firstName"
                        required
                        class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 mb-2"
                        >Last Name *</label
                      >
                      <input
                        type="text"
                        [(ngModel)]="shippingAddress.lastName"
                        name="lastName"
                        required
                        class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 mb-2"
                        >Phone Number *</label
                      >
                      <input
                        type="tel"
                        [(ngModel)]="shippingAddress.phone"
                        name="phone"
                        required
                        placeholder="+92-XXX-XXXXXXX"
                        class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 mb-2"
                        >Email Address *</label
                      >
                      <input
                        type="email"
                        [(ngModel)]="shippingAddress.email"
                        name="email"
                        required
                        class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2"
                      >Street Address *</label
                    >
                    <input
                      type="text"
                      [(ngModel)]="shippingAddress.address"
                      name="address"
                      required
                      placeholder="House/Flat number, Street name"
                      class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
                    />
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 mb-2"
                        >City *</label
                      >
                      <input
                        type="text"
                        [(ngModel)]="shippingAddress.city"
                        name="city"
                        required
                        class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 mb-2"
                        >District *</label
                      >
                      <select
                        [(ngModel)]="shippingAddress.district"
                        name="district"
                        required
                        class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
                      >
                        <option value="">Select District</option>
                        <option value="lahore">Lahore</option>
                        <option value="faisalabad">Faisalabad</option>
                        <option value="multan">Multan</option>
                        <option value="rawalpindi">Rawalpindi</option>
                        <option value="gujranwala">Gujranwala</option>
                        <option value="sialkot">Sialkot</option>
                        <option value="sargodha">Sargodha</option>
                        <option value="bahawalpur">Bahawalpur</option>
                        <option value="sheikhupura">Sheikhupura</option>
                        <option value="kasur">Kasur</option>
                      </select>
                    </div>
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 mb-2"
                        >Postal Code</label
                      >
                      <input
                        type="text"
                        [(ngModel)]="shippingAddress.postalCode"
                        name="postalCode"
                        class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2"
                      >Delivery Instructions (Optional)</label
                    >
                    <textarea
                      [(ngModel)]="shippingAddress.deliveryInstructions"
                      name="deliveryInstructions"
                      rows="3"
                      placeholder="Special delivery instructions (e.g., gate code, landmarks)"
                      class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
                    ></textarea>
                  </div>
                </div>

                <!-- Payment Method -->
                <div class="bg-white rounded-xl p-6 shadow-lg mb-6">
                  <h2 class="text-xl font-bold text-medical-navy mb-6">
                    Payment Method
                  </h2>

                  <div class="space-y-4">
                    <!-- Cash on Delivery -->
                    <div class="border border-gray-200 rounded-lg p-4">
                      <label class="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          [(ngModel)]="paymentMethod.type"
                          name="paymentType"
                          value="cod"
                          class="w-4 h-4 text-medical-blue focus:ring-medical-blue border-gray-300"
                        />
                        <div class="ml-3 flex-1">
                          <div class="flex items-center justify-between">
                            <span class="font-medium text-gray-900"
                              >Cash on Delivery (COD)</span
                            >
                            <span class="text-sm text-gray-500"
                              >+ PKR 50 fee</span
                            >
                          </div>
                          <p class="text-sm text-gray-500 mt-1">
                            Pay when you receive your order
                          </p>
                        </div>
                      </label>
                    </div>

                    <!-- JazzCash -->
                    <div class="border border-gray-200 rounded-lg p-4">
                      <label class="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          [(ngModel)]="paymentMethod.type"
                          name="paymentType"
                          value="jazzcash"
                          class="w-4 h-4 text-medical-blue focus:ring-medical-blue border-gray-300"
                        />
                        <div class="ml-3 flex-1">
                          <div class="flex items-center justify-between">
                            <span class="font-medium text-gray-900"
                              >JazzCash</span
                            >
                            <span class="text-sm text-healthcare-green"
                              >Instant</span
                            >
                          </div>
                          <p class="text-sm text-gray-500 mt-1">
                            Pay securely with JazzCash mobile wallet
                          </p>
                        </div>
                      </label>
                    </div>

                    <!-- EasyPaisa -->
                    <div class="border border-gray-200 rounded-lg p-4">
                      <label class="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          [(ngModel)]="paymentMethod.type"
                          name="paymentType"
                          value="easypaisa"
                          class="w-4 h-4 text-medical-blue focus:ring-medical-blue border-gray-300"
                        />
                        <div class="ml-3 flex-1">
                          <div class="flex items-center justify-between">
                            <span class="font-medium text-gray-900"
                              >EasyPaisa</span
                            >
                            <span class="text-sm text-healthcare-green"
                              >Instant</span
                            >
                          </div>
                          <p class="text-sm text-gray-500 mt-1">
                            Pay securely with EasyPaisa mobile wallet
                          </p>
                        </div>
                      </label>
                    </div>

                    <!-- Bank Transfer -->
                    <div class="border border-gray-200 rounded-lg p-4">
                      <label class="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          [(ngModel)]="paymentMethod.type"
                          name="paymentType"
                          value="bank_transfer"
                          class="w-4 h-4 text-medical-blue focus:ring-medical-blue border-gray-300"
                        />
                        <div class="ml-3 flex-1">
                          <div class="flex items-center justify-between">
                            <span class="font-medium text-gray-900"
                              >Bank Transfer</span
                            >
                            <span class="text-sm text-gray-500"
                              >24h verification</span
                            >
                          </div>
                          <p class="text-sm text-gray-500 mt-1">
                            Transfer to our bank account
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                <!-- Order Notes -->
                <div class="bg-white rounded-xl p-6 shadow-lg mb-6">
                  <h2 class="text-xl font-bold text-medical-navy mb-4">
                    Order Notes (Optional)
                  </h2>
                  <textarea
                    [(ngModel)]="orderNotes"
                    name="orderNotes"
                    rows="3"
                    placeholder="Any special instructions for your order"
                    class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
                  ></textarea>
                </div>
              </form>
            </div>

            <!-- Order Summary -->
            <div class="lg:col-span-1">
              <div class="bg-white rounded-xl p-6 shadow-lg sticky top-8">
                <h2 class="text-xl font-bold text-medical-navy mb-6">
                  Order Summary
                </h2>

                <!-- Cart Items -->
                <div class="space-y-4 mb-6">
                  <div
                    *ngFor="let item of cartService.items()"
                    class="flex items-center space-x-3"
                  >
                    <img
                      [src]="item.image"
                      [alt]="item.name"
                      class="w-16 h-16 object-contain rounded-lg bg-gray-50"
                    />
                    <div class="flex-1">
                      <h3 class="font-medium text-gray-900 text-sm">
                        {{ item.name }}
                      </h3>
                      <p class="text-sm text-gray-500">
                        Qty: {{ item.quantity }}
                      </p>
                      <p class="text-sm font-bold text-medical-navy">
                        PKR {{ item.price * item.quantity }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Order Totals -->
                <div class="border-t border-gray-200 pt-4 space-y-2">
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Subtotal</span>
                    <span class="font-medium"
                      >PKR {{ cartService.subtotal() }}</span
                    >
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Shipping</span>
                    <span class="font-medium">
                      <span
                        *ngIf="getShippingCost() === 0"
                        class="text-healthcare-green"
                        >FREE</span
                      >
                      <span *ngIf="getShippingCost() > 0"
                        >PKR {{ getShippingCost() }}</span
                      >
                    </span>
                  </div>
                  <div
                    *ngIf="paymentMethod.type === 'cod'"
                    class="flex justify-between text-sm"
                  >
                    <span class="text-gray-600">COD Fee</span>
                    <span class="font-medium">PKR 50</span>
                  </div>
                  <div
                    class="flex justify-between text-lg font-bold text-medical-navy border-t pt-2"
                  >
                    <span>Total</span>
                    <span>PKR {{ getFinalTotal() }}</span>
                  </div>
                </div>

                <!-- Place Order Button -->
                <button
                  (click)="processOrder()"
                  [disabled]="!isFormValid()"
                  class="w-full bg-medical-blue text-white py-4 rounded-lg font-bold text-lg hover:bg-medical-navy transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                >
                  Place Order
                </button>

                <!-- Security Badge -->
                <div
                  class="flex items-center justify-center mt-4 text-sm text-gray-500"
                >
                  <svg
                    class="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  Secure Checkout
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class CheckoutComponent {
  shippingAddress: ShippingAddress = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    district: "",
    postalCode: "",
    deliveryInstructions: "",
  };

  paymentMethod: PaymentMethod = {
    type: "cod",
  };

  orderNotes = "";
  isProcessing = signal(false);

  constructor(public cartService: CartService) {}

  getShippingCost(): number {
    return this.cartService.getShippingCost();
  }

  getFinalTotal(): number {
    let total = this.cartService.getTotal();
    if (this.paymentMethod.type === "cod") {
      total += 50; // COD fee
    }
    return total;
  }

  isFormValid(): boolean {
    return !!(
      this.shippingAddress.firstName &&
      this.shippingAddress.lastName &&
      this.shippingAddress.phone &&
      this.shippingAddress.email &&
      this.shippingAddress.address &&
      this.shippingAddress.city &&
      this.shippingAddress.district &&
      this.paymentMethod.type
    );
  }

  processOrder(): void {
    if (!this.isFormValid()) {
      alert("Please fill in all required fields");
      return;
    }

    this.isProcessing.set(true);

    // Simulate order processing
    setTimeout(() => {
      const orderData = {
        id: "AHC-" + Date.now(),
        items: this.cartService.items(),
        shippingAddress: this.shippingAddress,
        paymentMethod: this.paymentMethod,
        orderNotes: this.orderNotes,
        subtotal: this.cartService.subtotal(),
        shipping: this.getShippingCost(),
        total: this.getFinalTotal(),
        date: new Date(),
      };

      console.log("Order placed:", orderData);

      // Clear cart
      this.cartService.clearCart();

      // Navigate to success page or show success message
      alert("Order placed successfully! Order ID: " + orderData.id);

      this.isProcessing.set(false);
    }, 2000);
  }
}
